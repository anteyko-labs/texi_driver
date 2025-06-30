import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Car, ChevronRight, Loader2 } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';

// Интерфейс для данных бронирования
interface BookingData {
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: string;
  vehicleType: string;
  fullName: string;
  phone: string;
  notes: string;
}

// Функция для отправки данных на сервер
const submitBooking = async (data: BookingData): Promise<{ success: boolean; message: string; bookingId?: string }> => {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Booking submission error:', error);
    return {
      success: false,
      message: 'Произошла ошибка при отправке заявки. Попробуйте еще раз.'
    };
  }
};

// Альтернативная функция для отправки через email (используя EmailJS или подобный сервис)
const submitBookingViaEmail = async (data: BookingData): Promise<{ success: boolean; message: string }> => {
  try {
    // Пример с EmailJS
    const emailData = {
      from_name: data.fullName,
      from_email: data.email,
      phone: data.phone,
      from_city: data.from,
      to_city: data.to,
      travel_date: data.date,
      travel_time: data.time,
      passengers: data.passengers,
      vehicle_type: data.vehicleType,
      notes: data.notes,
      to_email: 'your-business-email@example.com'
    };

    // Замените на ваш EmailJS сервис
    // const response = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'YOUR_PUBLIC_KEY');
    
    // Симуляция отправки
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
    };
  } catch (error) {
    console.error('Email submission error:', error);
    return {
      success: false,
      message: 'Ошибка отправки заявки через email.'
    };
  }
};

// Функция для отправки в Telegram
const submitBookingToTelegram = async (data: BookingData): Promise<{ success: boolean; message: string }> => {
  try {
    const botToken = '8031894532:AAE2R4CjHn6z4q-9sRFtzIyHjCQRy8Abb0k';
    const chatId = '7589800554';
    const message = `
🚗 *Новая заявка на бронирование*

👤 *Клиент:* ${data.fullName}
📞 *Телефон:* ${data.phone}

🛣️ *Маршрут:* ${data.from} → ${data.to}
📅 *Дата:* ${data.date}
⏰ *Время:* ${data.time}
👥 *Пассажиры:* ${data.passengers}
🚙 *Тип авто:* ${data.vehicleType}

📝 *Заметки:* ${data.notes || 'Нет'}

⏱️ *Время заявки:* ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Asia/Bishkek',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
    `;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error:', errorData);
      throw new Error(`Telegram API error: ${errorData.description || 'Unknown error'}`);
    }

    return {
      success: true,
      message: 'Заявка отправлена! Мы свяжемся с вами в течение 15 минут.'
    };
  } catch (error) {
    console.error('Telegram submission error:', error);
    return {
      success: false,
      message: 'Ошибка отправки заявки. Попробуйте еще раз или свяжитесь с нами по телефону.'
    };
  }
};

const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  
  // Get route data from location state if available
  const initialFrom = location.state?.from || '';
  const initialTo = location.state?.to || '';
  
  const [formData, setFormData] = useState<BookingData>({
    from: initialFrom,
    to: initialTo,
    date: '',
    time: '',
    passengers: '1',
    vehicleType: 'sedan',
    fullName: '',
    phone: '',
    notes: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Отправка в Telegram
      const result = await submitBookingToTelegram(formData);
      
      setSubmitStatus(result);
      
      if (result.success) {
        // Очистить форму при успешной отправке
        setFormData({
          from: '',
          to: '',
          date: '',
          time: '',
          passengers: '1',
          vehicleType: 'sedan',
          fullName: '',
          phone: '',
          notes: ''
        });
        setStep(1);
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Произошла неожиданная ошибка. Попробуйте еще раз.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const cities = ['Bishkek', 'Almaty', 'Issyk-Kul', 'Osh', 'Talas'];
  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'minivan', label: 'Minivan' },
    { value: 'suv', label: 'SUV' },
    { value: 'premium', label: 'Premium' },
    { value: 'sprinter', label: 'Sprinter' }
  ];
  
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero section */}
      <div className="relative py-24 bg-black-light overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            title={t('booking.title')}
            subtitle={t('booking.subtitle')}
            light
          />
        </div>
      </div>
      
      {/* Booking form */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto glass-card p-8">
            {/* Статус отправки */}
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.success 
                  ? 'bg-green-900/50 border border-green-500 text-green-200' 
                  : 'bg-red-900/50 border border-red-500 text-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            {/* Progress steps */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2 z-0"></div>
              
              {[1, 2, 3].map((s) => (
                <div key={s} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= s ? 'bg-gold-gradient text-black' : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {s}
                  </div>
                  <div className={`mt-2 text-sm ${step >= s ? 'text-gold-light' : 'text-gray-500'}`}>
                    {s === 1 ? t('booking.journey') : s === 2 ? t('booking.vehicle') : t('booking.details')}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Journey Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6 text-white">{t('booking.journey_details')}</h3>
                  <div className="mb-4 text-gold-light text-center font-semibold animate-pulse">
                    {t('booking.anywhere_hint')}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="from" className="block text-sm font-medium text-gray-300 mb-1">
                        {t('booking.from')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="from"
                          name="from"
                          value={formData.from}
                          onChange={handleChange}
                          required
                          placeholder={t('booking.from_placeholder')}
                          className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="to" className="block text-sm font-medium text-gray-300 mb-1">
                        {t('booking.to')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="to"
                          name="to"
                          value={formData.to}
                          onChange={handleChange}
                          required
                          placeholder={t('booking.to_placeholder')}
                          className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                        {t('booking.date')}
                      </label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="w-full bg-black-light border border-gray-700 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                        {t('booking.time')}
                      </label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full bg-black-light border border-gray-700 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary inline-flex items-center"
                    >
                      {t('common.next')}
                      <ChevronRight size={16} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Vehicle Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6 text-white">{t('booking.vehicle_passengers')}</h3>
                  
                  <div className="mb-6">
                    <label htmlFor="passengers" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('booking.passengers')}
                    </label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="passengers"
                        name="passengers"
                        min="1"
                        max="18"
                        value={formData.passengers}
                        onChange={handleChange}
                        required
                        className="w-full bg-black-light border border-gray-700 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('booking.vehicle_type')}
                    </label>
                    <div className="relative">
                      <Car size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        id="vehicleType"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                        className="w-full bg-black-light border border-gray-700 rounded-lg py-2 pl-9 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                      >
                        {vehicleTypes.map((type) => (
                          <option key={type.value} value={type.value}>{t(`vehicles.${type.value}_title`)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-outline"
                    >
                      {t('common.back')}
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary inline-flex items-center"
                    >
                      {t('common.next')}
                      <ChevronRight size={16} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Personal Details */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6 text-white">{t('booking.personal_info')}</h3>
                  
                  <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                        {t('booking.full_name')}
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        {t('booking.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                        {t('booking.notes')}
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-outline"
                      disabled={isSubmitting}
                    >
                      {t('common.back')}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary inline-flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        t('booking.book_ride')
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;