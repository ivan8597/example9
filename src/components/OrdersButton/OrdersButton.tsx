import { FC, useState } from 'react';
import styles from './OrdersButton.module.scss';
import { Logo } from '../../utilities/logos';
import { formatNumberWithSpaces } from '../../utils';
import { useCurrencyStore } from '../../store/currencyStore';
import { SYMBOLS, RATES, Currency, convertPrice } from "../../utils/currency";

interface SavedTicket {
  id: number;
  carrier: string;
  price: number;
  date: string;
  segments: {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
  }[];
}

interface OrdersModalProps {
  onClose: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Если дата невалидная, пробуем другой формат
    return dateString;
  }
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const OrdersModal: FC<OrdersModalProps> = ({ onClose }) => {
  const tickets = JSON.parse(localStorage.getItem('tickets') || '[]') as SavedTicket[];
  const { currency, setCurrency } = useCurrencyStore();

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2>Ваши заказы</h2>
        <div className={styles.currencySelector}>
          {(Object.keys(RATES) as Currency[]).map((curr) => (
            <button
              key={curr}
              className={`${styles.currencyBtn} ${currency === curr ? styles.active : ''}`}
              onClick={() => setCurrency(curr as Currency)}
            >
              {curr}
            </button>
          ))}
        </div>
        {tickets.map((ticket) => (
          <div key={ticket.id} className={styles.orderItem}>
            <div className={styles.header}>
              <img src={Logo[ticket.carrier]} alt={ticket.carrier} width="100px" />
              <p className={styles.price}>
                {formatNumberWithSpaces(convertPrice(ticket.price, currency))} {SYMBOLS[currency]}
              </p>
            </div>
            
            {ticket.segments?.map((segment, index) => (
              <div key={index} className={styles.segment}>
                <div className={styles.route}>
                  <div>
                    <p className={styles.cities}>
                      {segment.origin} – {segment.destination}
                    </p>
                    <p className={styles.time} style={{ whiteSpace: 'pre-line' }}>{segment.date}</p>
                  </div>
                  <div>
                    <p className={styles.stops}>
                      {segment.stops.length 
                        ? `${segment.stops.length} пересадк${segment.stops.length === 1 ? 'а' : 'и'}`
                        : 'Без пересадок'
                      }
                    </p>
                    <p>{segment.stops.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <p className={styles.orderDate}>Дата заказа: {formatDate(ticket.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OrdersButton: FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        className={styles.viewOrdersBtn}
        onClick={() => setShowModal(true)}
      >
        Посмотреть заказы
      </button>

      {showModal && <OrdersModal onClose={() => setShowModal(false)} />}
    </>
  );
}; 