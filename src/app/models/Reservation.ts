export interface IReservation {
    user_id: number;
    restaurant_id: number;
    order_datetime: Date;
    table_number: number;
    guests: number;
}
