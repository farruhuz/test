import { useRef } from 'react';

import { OrderDetails } from '@/api/types/order.types';
import { thousandSeperator } from '@/helpers/thousand-separator.helper';

import { ModalProps, Modal } from '@/components/Modal';
import { OrderDetailsCard } from '@/components/OrderDetailsCard';
import { PaymentType } from '@/components/OrderInfoModal/PaymentType';

// =================================================================

interface OrderInfoModalProps
  extends Omit<ModalProps, 'children' | 'canEscapeKeyClose' | 'canOutsideClickClose'> {
  order?: OrderDetails;
}

// =================================================================

export const OrderInfoModal = (props: OrderInfoModalProps) => {
  const { onClose, isOpen, order, ...rest } = props;

  const onCloseRef = useRef<VoidFunction>();
  if (!onCloseRef.current) {
    onCloseRef.current = () => {
      onClose();
    };
  }

  if (!order || !isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseRef.current}
      canOutsideClickClose={false}
      className="max-w-[736px]"
      {...rest}
    >
      <OrderDetailsCard.Title className="mb-4">Информация о столе</OrderDetailsCard.Title>
      <OrderDetailsCard.Price
        leftText="Номер стола"
        rightText={`№${order.table_number} - Внутренный`}
        className="mb-4"
      />
      <OrderDetailsCard.Price
        leftText="Количество гостей"
        rightText={`${order.client_count} человека`}
        className="mb-4"
      />
      <OrderDetailsCard.Price
        leftText="ФИО официанта"
        rightText={order.waiter.name}
        className="mb-8"
      />
      <div className="mb-4 flex items-center justify-between">
        <OrderDetailsCard.Title>Информация о заказе</OrderDetailsCard.Title>
        <span className="rounded-lg bg-yellow-100 px-4 py-2 text-yellow">{order.status}</span>
      </div>
      {order.menus.map(menu => (
        <OrderDetailsCard.Price
          key={menu.id}
          leftText={`${menu.count} х Салат “${menu.name}”`}
          rightText={`${thousandSeperator(menu.price)} сум`}
          className="mb-4"
        />
      ))}
      <div className="mb-4 mt-8 flex items-center justify-between">
        <OrderDetailsCard.Title>Итого</OrderDetailsCard.Title>
        <OrderDetailsCard.Title>{thousandSeperator(order.price)} сум</OrderDetailsCard.Title>
      </div>
      <OrderDetailsCard.Price
        leftText={`Обслуживание ${order.waiter.percent}%`}
        rightText={`${thousandSeperator(order.service_price)} сум`}
        className="mb-8"
      />
      <PaymentType />
    </Modal>
  );
};
