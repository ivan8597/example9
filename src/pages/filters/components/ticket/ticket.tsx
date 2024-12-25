import { FC } from "react";
import moment from "moment";
import { useSpacesFromNumbers } from "../../../../utilities/useSpacesFormNumbers";
import { declension } from "../../../../utilities/declension";
import { Logo } from "../../../../utilities/logos";
import styles from "./ticket.module.scss";
import { TicketProps } from "../../../../types";

export const Ticket: FC<TicketProps> = ({ ticket }) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.price}>
        <img src={Logo[ticket.carrier]} width={"119px"} />
        <div className={styles.button}>
          Купить за <br /> {useSpacesFromNumbers(ticket.price)} &#8381;
        </div>
      </div>
      <div className={styles.dash}></div>
      <div className={styles.description}>
        <div className={styles.origin}>
          <div className={styles.time}>{ticket.departure_time}</div>
          <div className={styles.details}>
            <div>{`${ticket.origin}, ${ticket.origin_name}`}</div>
            <div className={styles.date}>
              {moment(ticket.departure_date)
                .locale("ru")
                .format("D MMM YYYY, dddd")}
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
              {moment(ticket.arrival_date)
                .locale("ru")
                .format("D MMM YYYY, dddd")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
