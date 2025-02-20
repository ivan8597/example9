import { FC, useState } from "react";
import moment from "moment";
import { useSpacesFromNumbers } from "../../../../utilities/useSpacesFormNumbers";
import { declension } from "../../../../utilities/declension";
import { Logo } from "../../../../utilities/logos";
import { useCurrencyStore } from "../../../../store/currencyStore";
import styles from "./ticket.module.scss";
import { TicketProps } from "../../../../types";
import { SYMBOLS, convertPrice } from "../../../../utils/currency";
import { useLanguageStore } from '../../../../store/languageStore';
import { translations, TranslationKey } from '../../../../utils/translations';

const formatDate = (dateStr: string) => {
  return moment(dateStr, "DD.MM.YY")
    .locale("ru")
    .format("D MMM YYYY, dddd");
};

export const Ticket: FC<TicketProps> = ({ ticket }) => {
  const { currency } = useCurrencyStore();
  const { language } = useLanguageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const translateCity = (city: string) => {
    if (city in translations[language]) {
      return translations[language][city as keyof typeof translations[typeof language]];
    }
    return city;
  };

  const handleBuyTicket = () => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    
    const newTicket = {
      id: Date.now(),
      carrier: ticket.carrier,
      price: ticket.price,
      date: new Date().toISOString(),
      segments: [{
        origin: ticket.origin,
        origin_name: ticket.origin_name,
        destination: ticket.destination,
        destination_name: ticket.destination_name,
        departure_time: ticket.departure_time,
        departure_date: ticket.departure_date,
        arrival_time: ticket.arrival_time,
        arrival_date: ticket.arrival_date,
        stops: Array(ticket.stops).fill('').map((_, i) => `Пересадка ${i + 1}`),
        duration: moment(ticket.arrival_time, "HH:mm")
          .diff(moment(ticket.departure_time, "HH:mm"), 'minutes')
      }]
    };

    localStorage.setItem('tickets', JSON.stringify([...savedTickets, newTicket]));
    setIsModalOpen(true);
  };

  const convertedPrice = convertPrice(ticket.price, currency);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getStopsText = (stops: number) => {
    if (stops === 0) return translations[language]['Без пересадок'];
    if (stops === 1) return translations[language]['1 пересадка'];
    if (stops === 2) return translations[language]['2 пересадки'];
    if (stops === 3) return translations[language]['3 пересадки'];
    return `${stops} пересадки`;
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.price}>
        <img src={Logo[ticket.carrier]} width={"119px"} alt={ticket.carrier} />
        <div 
          className={styles.button}
          onClick={handleBuyTicket}
          role="button"
        >
          {translations[language]['Купить за']} <br /> {useSpacesFromNumbers(convertedPrice)} {SYMBOLS[currency]}
        </div>
      </div>
      <div className={styles.dash}></div>
      <div className={styles.description}>
        <div className={styles.origin}>
          <div className={styles.time}>{ticket.departure_time}</div>
          <div className={styles.details}>
            <div>{`${translateCity(ticket.origin)}, ${translateCity(ticket.origin_name)}`}</div>
            <div className={styles.date}>
              {formatDate(ticket.departure_date)}
            </div>
          </div>
        </div>
        <div className={styles.stops}>
          {getStopsText(ticket.stops)}
        </div>
        <div className={styles.destination}>
          <div className={styles.time}>{ticket.arrival_time}</div>
          <div className={styles.details}>
            <div>{`${translateCity(ticket.destination)}, ${translateCity(ticket.destination_name)}`}</div>
            <div className={styles.date}>
              {formatDate(ticket.arrival_date)}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className={styles.modalBackdrop} onClick={closeModal}></div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>Билет добавлен в заказы!</p>
              <button onClick={closeModal}>Закрыть</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
