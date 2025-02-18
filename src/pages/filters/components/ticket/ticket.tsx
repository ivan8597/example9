import { FC } from "react";
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
  const { currency } = useCurrencyStore();
  
  const handleBuyTicket = () => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const newTicket = {
      id: Date.now(),
      carrier: ticket.carrier,
      price: ticket.price, // сохраняем цену в рублях
      date: new Date().toLocaleString('ru-RU'),
      segments: [{
        origin: `${ticket.origin}, ${ticket.origin_name}`,
        destination: `${ticket.destination}, ${ticket.destination_name}`,
        date: `${ticket.departure_time}\n${ticket.origin}, ${ticket.origin_name}\n${formatDate(ticket.departure_date)}\n${ticket.arrival_time}\n${ticket.destination}, ${ticket.destination_name}\n${formatDate(ticket.arrival_date)}`,
        stops: Array(ticket.stops).fill('').map(() => 'Информация о пересадке'),
        duration: moment(ticket.arrival_date, "DD.MM.YY")
          .diff(moment(ticket.departure_date, "DD.MM.YY"), 'minutes')
      }]
    };
    
    localStorage.setItem('tickets', JSON.stringify([...savedTickets, newTicket]));
    alert('Билет добавлен в заказы!');
  };

  const convertedPrice = convertPrice(ticket.price, currency);

  return (
    <div className={styles.ticket}>
      <div className={styles.price}>
        <img src={Logo[ticket.carrier]} width={"119px"} />
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
    </div>
  );
};
