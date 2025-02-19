import { FC, useState } from 'react';
import styles from './Ticket.module.scss';
import { Logo } from '../../utils';
import { FlightInfo } from '../FlightInfo/FlightInfo';
import { StopsInfo } from '../StopsInfo/StopsInfo';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';
import { ExistingModal } from '../Modal/ExistingModal';

interface TicketProps {
  ticket: {
    carrier: string;
    price: number;
    origin: string;
    origin_name: string;
    destination: string;
    destination_name: string;
    departure_time: string;
    departure_date: string;
    arrival_time: string;
    arrival_date: string;
    stops: number;
  };
}

export const Ticket: FC<TicketProps> = ({ ticket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyTicket = () => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const newTicket = {
      id: Date.now(),
      ...ticket,
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
        duration: 0 
      }]
    };

    localStorage.setItem('tickets', JSON.stringify([...savedTickets, newTicket]));
    setIsModalOpen(true);
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <img src={Logo[ticket.carrier]} alt={ticket.carrier} width="100px" />
        <PriceDisplay price={ticket.price} />
      </div>

      <div className={styles.route}>
        <FlightInfo
          time={ticket.departure_time}
          city={ticket.origin}
          cityName={ticket.origin_name}
          date={ticket.departure_date}
        />
        <StopsInfo stopsCount={ticket.stops} />
        <FlightInfo
          time={ticket.arrival_time}
          city={ticket.destination}
          cityName={ticket.destination_name}
          date={ticket.arrival_date}
        />
      </div>

      <button className={styles.buyButton} onClick={handleBuyTicket}>
        Купить билет
      </button>

      <ExistingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Успешно!</h3>
        <p>Билет добавлен в заказы</p>
      </ExistingModal>
    </div>
  );
}; 