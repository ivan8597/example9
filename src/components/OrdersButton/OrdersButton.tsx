import { FC, useState } from 'react';
import styles from './OrdersButton.module.scss';
import { Logo } from '../../utilities/logos';
import { FlightInfo } from '../FlightInfo/FlightInfo';
import { StopsInfo } from '../StopsInfo/StopsInfo';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';
import { SavedTicket } from '../../types/ticket';
import { useLanguageStore } from '../../store/languageStore';
import { translations } from '../../utils/translations';

interface OrdersModalProps {
  onClose: () => void;
}

const OrdersModal: FC<OrdersModalProps> = ({ onClose }) => {
  const tickets = JSON.parse(localStorage.getItem('tickets') || '[]') as SavedTicket[];
  const { language } = useLanguageStore();

  const translateCity = (city: string) => {
    if (city in translations[language]) {
      return translations[language][city as keyof typeof translations[typeof language]];
    }
    return city;
  };

  const handleClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2>{translations[language]['Ваши заказы']}</h2>
        <button className={styles.clearBtn} onClick={handleClear}>
          {translations[language]['Очистить заказы']}
        </button>
        {tickets.length === 0 ? (
          <p>У вас пока нет заказов</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className={styles.orderItem}>
              <div className={styles.header}>
                <img 
                  src={Logo[ticket.carrier]} 
                  alt={ticket.carrier} 
                  width="100" 
                  height="36"
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.src = Logo.SU;
                  }}
                />
                <PriceDisplay price={ticket.price} />
              </div>
              {ticket.segments?.map((segment, index) => (
                <div key={index} className={styles.segment}>
                  <div className={styles.route}>
                    <FlightInfo
                      time={segment.departure_time}
                      city={translateCity(segment.origin)}
                      cityName={translateCity(segment.origin_name)}
                      date={segment.departure_date}
                    />
                    <StopsInfo stopsCount={segment.stops.length} />
                    <FlightInfo
                      time={segment.arrival_time}
                      city={translateCity(segment.destination)}
                      cityName={translateCity(segment.destination_name)}
                      date={segment.arrival_date}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const OrdersButton: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { language } = useLanguageStore();

  return (
    <>
      <button className={styles.viewOrdersBtn} onClick={() => setShowModal(true)}>
        {translations[language]['Посмотреть заказы']}
      </button>
      {showModal && <OrdersModal onClose={() => setShowModal(false)} />}
    </>
  );
}; 