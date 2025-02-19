import { FC, useState } from "react";
import moment from "moment";
import { useSpacesFromNumbers } from "../../../../utilities/useSpacesFormNumbers";
import { declension } from "../../../../utilities/declension";
import { Logo } from "../../../../utilities/logos";
import { useCurrencyStore } from "../../../../store/currencyStore";
import styles from "./ticket.module.scss";
import { TicketProps } from "../../../../types";
import { SYMBOLS, convertPrice } from "../../../../utils/currency";

const formatDate = (dateStr: string) => {
  return moment(dateStr, "DD.MM.YY")
    .locale("ru")
    .format("D MMM YYYY, dddd");
};

export const Ticket: FC<TicketProps> = ({ ticket }) => {
  console.log('Ticket data:', ticket);
  const { currency } = useCurrencyStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    console.log('Saving new ticket:', newTicket);
    localStorage.setItem('tickets', JSON.stringify([...savedTickets, newTicket]));
    setIsModalOpen(true);
  };

  const convertedPrice = convertPrice(ticket.price, currency);

  const closeModal = () => {
    setIsModalOpen(false);
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
          Купить за <br /> {useSpacesFromNumbers(convertedPrice)} {SYMBOLS[currency]}
        </div>
      </div>
      <div className={styles.dash}></div>
      <div className={styles.description}>
        <div className={styles.origin}>
          <div className={styles.time}>{ticket.departure_time}</div>
          <div className={styles.details}>
            <div>{`${ticket.origin}, ${ticket.origin_name}`}</div>
            <div className={styles.date}>
              {formatDate(ticket.departure_date)}
            </div>
          </div>
        </div>
        <div className={styles.stops}>
          {`${ticket.stops} ${declension(
            ticket.stops,
            "пересадка",
            "пересадки",
            "пересадок"
          )}`}
        </div>
        <div className={styles.destination}>
          <div className={styles.time}>{ticket.arrival_time}</div>
          <div className={styles.details}>
            <div>{`${ticket.destination}, ${ticket.destination_name}`}</div>
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
