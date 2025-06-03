import React, { useState, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

// Мемоизированный компонент для обычных карточек
const VehicleShowcase = memo(({ category, models, imageSrc }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl group hover:shadow-blue-500/20 transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white mb-1">{category}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-2">
          {models.map((model, index) => (
            <div key={index} className="text-gray-300 text-sm flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              {model}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Оптимизированный 3D компонент с поддержкой touch-управления
const Vehicle3DShowcase = memo(({ category, models, embedUrl, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer для ленивой загрузки
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Задержка перед загрузкой iframe для плавности
          setTimeout(() => setShouldLoad(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const element = document.getElementById(`vehicle-${category.replace(/\s+/g, '-')}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [category]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Оптимизированный URL с поддержкой touch и камеры
  const optimizedEmbedUrl = embedUrl.replace('autostart=0', 'autostart=0')
    .replace('ui_controls=0', 'ui_controls=1') // Включаем контролы для мобильных
    .replace('camera=0', 'camera=1') // Включаем управление камерой
    + '&dnt=1' // Do not track
    + '&transparent=0'
    + '&ui_theme=dark'
    + '&ui_hint=2' // Показываем подсказки на мобильных
    + '&orbit_constraint_pan=0' // Разрешаем панорамирование
    + '&orbit_constraint_zoom_in=0.1' // Минимальный зум
    + '&orbit_constraint_zoom_out=10' // Максимальный зум
    + '&double_click=0' // Отключаем двойной клик для фуллскрина
    + '&scrollwheel=1' // Включаем зум колесиком мыши
    + '&internal=1'; // Внутренний режим

  return (
    <div 
      id={`vehicle-${category.replace(/\s+/g, '-')}`}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl group hover:shadow-blue-500/20 transition-shadow duration-300"
    >
      {/* 3D Model Container */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        {!isLoaded && shouldLoad && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-white text-sm">Загрузка 3D модели...</p>
            </div>
          </div>
        )}
        
        {!shouldLoad && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🚗</span>
              </div>
              <p className="text-white text-sm">3D модель будет загружена</p>
            </div>
          </div>
        )}
        
        {/* 3D Model iframe - с поддержкой touch */}
        {shouldLoad && (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <iframe 
              title={title}
              className={`absolute -top-8 -left-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              frameBorder="0" 
              allowFullScreen={false}
              allow="autoplay; fullscreen; gyroscope; accelerometer" 
              loading="lazy"
              src={optimizedEmbedUrl}
              onLoad={handleLoad}
              style={{
                pointerEvents: 'auto',
                border: 'none',
                outline: 'none',
                touchAction: 'manipulation' // Включаем touch-события
              }}
            />
          </div>
        )}
        
        {/* Интерактивная подсказка */}
        {isLoaded && (
          <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isMobile ? '👆 Пинч для масштабирования' : '🖱️ Кликните для взаимодействия'}
          </div>
        )}

        {/* Мобильная подсказка */}
        {isLoaded && isMobile && (
          <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-xs">
            <div className="flex items-center gap-1">
              <span className="text-xs">👆</span>
              <span className="text-xs">Двумя пальцами</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {category}
          </h3>
        </div>
        
        <div className="space-y-3">
          {models.map((model, index) => (
            <div key={index} className="text-gray-300 text-sm flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
              <span className="font-medium">{model}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Мемоизированный компонент заголовка
const SectionHeading = memo(({ title, subtitle, light = false }) => {
  return (
    <div className="text-center mb-12">
      <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl ${light ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
          {subtitle}
        </p>
      )}
    </div>
  );
});

// Оптимизированный компонент частиц
const OptimizedParticles = memo(() => {
  const particles = Array.from({ length: 8 }, (_, i) => ({ // Уменьшено с 20 до 8
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-500 rounded-full animate-ping"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
});

// Главный компонент страницы
const VehiclesPage = () => {
  const { t } = useTranslation();
  
  const vehicleCategories = [
    {
      category: 'Sedan',
      models: ['HYUNDAI SONATA DN8', 'HYUNDAI SONATA NEW RISE', 'HYUNDAI GRANDEUR', 'KIA K5', 'KIA K7', 'TOYOTA CAMRY'],
      imageSrc: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      is3D: true,
      embedUrl: 'https://sketchfab.com/models/4794cd0dd4b842d9a00023a20854e6e8/embed?autostart=0&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_loading=0&preload=0&transparent=0&autospin=0&ui_hint=0&camera=0&ui_theatre=0',
      title: 'KIA K5 2021'
    },
    {
      category: 'Minivan',
      models: ['TOYOTA ALPHARD', 'TOYOTA VEELFIRE', 'KIA CARNIVAL', 'HYUNDAI STAREX', 'HYUNDAI STARIA'],
      imageSrc: 'https://images.pexels.com/photos/8916917/pexels-photo-8916917.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      is3D: true,
      embedUrl: 'https://sketchfab.com/models/8990fcf6797645e090b2380b83af2ae6/embed?autostart=0&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_loading=0&preload=0&transparent=0&autospin=0&ui_hint=0&camera=0&ui_theatre=0',
      title: 'Modern Minivan'
    },
    {
      category: 'SUV',
      models: ['LEXUS 570'],
      imageSrc: 'https://images.pexels.com/photos/11851224/pexels-photo-11851224.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      is3D: true,
      embedUrl: 'https://sketchfab.com/models/605997db34c445898e4e92c8f4524378/embed?autostart=0&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_loading=0&preload=0&transparent=0&autospin=0&ui_hint=0&camera=0&ui_theatre=0',
      title: 'Lexus LX 570'
    },
    {
      category: 'Premium',
      models: ['MERCEDES-BENZ 221/222/223', 'MERCEDES-BENZ MAYBACH'],
      imageSrc: 'https://images.pexels.com/photos/6894428/pexels-photo-6894428.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      is3D: true,
      embedUrl: 'https://sketchfab.com/models/979f37a878f04b2a8d888b62ea6027e9/embed?autostart=0&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_loading=0&preload=0&transparent=0&autospin=0&ui_hint=0&camera=0&ui_theatre=0',
      title: 'Mercedes-Benz Maybach 2022'
    },
    {
      category: 'Mercedes-Benz Sprinter',
      models: ['MERCEDES-BENZ SPRINTER H2 L3', 'MERCEDES-BENZ SPRINTER REX'],
      imageSrc: '',
      is3D: true,
      embedUrl: 'https://sketchfab.com/models/ee6ecd7dae494d219e22700a994d7640/embed?autostart=0&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_loading=0&preload=0&transparent=0&autospin=0&ui_hint=0&camera=0&ui_theatre=0',
      title: 'Mercedes-Benz Sprinter Passenger H2 L3 Van'
    }
  ];
  
  // Минимальные критические стили с поддержкой touch
  useEffect(() => {
    const globalStyle = document.createElement('style');
    globalStyle.textContent = `
      iframe[src*="sketchfab.com"] {
        border: none !important;
        outline: none !important;
        touch-action: manipulation !important;
      }
      
      /* Поддержка touch-событий */
      .touch-enabled {
        touch-action: pan-x pan-y pinch-zoom !important;
      }
      
      /* Скрытие UI элементов Sketchfab, но оставляем контролы для мобильных */
      [class*="watermark"],
      [class*="attribution"],
      [class*="logo"],
      [class*="branding"],
      .viewer-watermark,
      .viewer-attribution {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      
      /* Частичное скрытие контролов на десктопе, но оставляем на мобильных */
      @media (min-width: 769px) {
        .play-button,
        .play-icon,
        [class*="play"],
        button[aria-label*="play"],
        [data-test="play-button"],
        .viewer-play-button,
        .play-overlay,
        .c-viewer-play-button,
        .viewer-ui-play-button,
        [data-testid*="play"],
        .sketchfab-play-button,
        .viewer-controls .play,
        button[title*="play"],
        button[title*="Play"],
        .play-icon-container,
        .player-play-button {
          opacity: 0 !important;
          visibility: hidden !important;
          display: none !important;
          pointer-events: none !important;
        }
      }
      
      /* На мобильных оставляем минимальные контролы */
      @media (max-width: 768px) {
        iframe[src*="sketchfab.com"] {
          touch-action: pan-x pan-y pinch-zoom !important;
        }
      }
      
      /* Улучшение производительности touch-событий */
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Разрешаем выделение текста только для контента */
      .text-content,
      .text-content * {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
    `;
    document.head.appendChild(globalStyle);
    
    return () => {
      if (document.head.contains(globalStyle)) {
        document.head.removeChild(globalStyle);
      }
    };
  }, []);
  
  return (
    <div className="pt-20 min-h-screen bg-black">
      {/* Hero section */}
      <div className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Статичный фон вместо анимированного */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        
        {/* Оптимизированные частицы */}
        <OptimizedParticles />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            title={t('vehicles.title')}
            subtitle={t('vehicles.subtitle')}
            light
          />
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center text-content">
              <div className="text-4xl font-bold text-blue-400 mb-2">30+</div>
              <div className="text-gray-300">{t('vehicles.models')}</div>
            </div>
            <div className="text-center text-content">
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-gray-300">{t('vehicles.ka')}</div>
            </div>
            <div className="text-center text-content"> 
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300">{t('vehicles.la')} </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vehicles showcase */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicleCategories.map((vehicle, index) => (
              <div 
                key={vehicle.category}
                className="transform transition-transform duration-300 hover:scale-102"
              >
                {vehicle.is3D ? (
                  <Vehicle3DShowcase
                    category={vehicle.category}
                    models={vehicle.models}
                    embedUrl={vehicle.embedUrl}
                    title={vehicle.title}
                  />
                ) : (
                  <VehicleShowcase
                    category={vehicle.category}
                    models={vehicle.models}
                    imageSrc={vehicle.imageSrc}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;