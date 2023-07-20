import React, { useContext, useEffect, useState } from 'react';

import { LocaleContext } from '/src/components/locale';
import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';
import {
  Payment,
  ContentInvoicing,
  ContentInvoicingProfile,
  ContentInvoicingTitle,
  ContentInvoicingText,
  ContentInvoicingButtonText,
  ContentInvoicingButton,
  ContentInvoicingHistory,
  ContentInvoicingValue,
  ContentInvoicingDesc
} from '../../../components';

const Plans = () => {
  const {locale} = useContext(LocaleContext);
  const {user} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);
  const [payment, setPayment] = useState(null);
  const [price, setPrice] = useState(null);
  const [method, setMethod] = useState(null);
  const [editPayment, setEditPayment] = useState(false);

  const handlePayment = () => {
    setEditPayment(!editPayment);
  };

  useEffect(() => {
    setPayment(user?.payments.method);
    setPrice(user?.payments.history.price+'$');
    setMethod(user?.payments.method.toUpperCase());
  }, [user]);
    
  return (
    <ContentInvoicing>
      {editPayment?<Payment payment={payment} setEditPayment={setEditPayment} />:null}
      <ContentInvoicingProfile>
        <ContentInvoicingTitle theme={theme}>{locale.plans.title}</ContentInvoicingTitle>
      </ContentInvoicingProfile>
      <ContentInvoicingButton theme={theme} onPress={handlePayment}>
        <ContentInvoicingHistory>
          <ContentInvoicingText theme={theme}>{user?.payments.history.name}</ContentInvoicingText>
          <ContentInvoicingDesc>
            <ContentInvoicingValue theme={theme}>{price}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{locale.invoicing.description}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{method}</ContentInvoicingValue>
          </ContentInvoicingDesc>
        </ContentInvoicingHistory>
        <ContentInvoicingButtonText color="payment" theme={theme}>{locale.plans.button}</ContentInvoicingButtonText>
      </ContentInvoicingButton>
    </ContentInvoicing>
  );
};

export default Plans;