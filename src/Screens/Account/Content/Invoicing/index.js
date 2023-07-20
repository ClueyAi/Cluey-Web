import React, { useContext, useEffect, useState } from 'react';
import { Image } from 'react-native';

import { LocaleContext } from '/src/components/locale';
import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';
import {
  Payment,
  ContentInvoicing,
  ContentInvoicingProfile,
  ContentInvoicingSection,
  ContentInvoicingTitle,
  ContentInvoicingText,
  ContentInvoicingButtonText,
  ContentInvoicingButton,
  ContentInvoicingPay,
  ContentInvoicingHistory,
  ContentInvoicingValue,
  ContentInvoicingDesc
} from '../../../components';

const Invoicing = () => {
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
        <ContentInvoicingTitle theme={theme}>{locale.invoicing.title}</ContentInvoicingTitle>
      </ContentInvoicingProfile>
      <ContentInvoicingSection theme={theme}>
        <ContentInvoicingButton theme={theme} onPress={handlePayment}>
          <ContentInvoicingPay>
            <Image style={{width: 115, height: 55, marginBottom: -4}} source={require('/assets/images/icons/paypal.png')} />
          </ContentInvoicingPay>
          <ContentInvoicingButtonText color="payment" theme={theme}>{locale.invoicing.button}</ContentInvoicingButtonText>
        </ContentInvoicingButton>
      </ContentInvoicingSection>
      <ContentInvoicingProfile>
        <ContentInvoicingTitle theme={theme}>{locale.invoicing.history}</ContentInvoicingTitle>
      </ContentInvoicingProfile>
      <ContentInvoicingSection theme={theme}>
        <ContentInvoicingHistory>
          <ContentInvoicingText theme={theme}>{user?.payments.history.name}</ContentInvoicingText>
          <ContentInvoicingDesc>
            <ContentInvoicingValue theme={theme}>{price}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{locale.invoicing.description}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{method}</ContentInvoicingValue>
          </ContentInvoicingDesc>
        </ContentInvoicingHistory>
        <ContentInvoicingValue theme={theme}>{user?.payments.history.createdAt}</ContentInvoicingValue>
      </ContentInvoicingSection>
      <ContentInvoicingSection theme={theme}>
        <ContentInvoicingHistory>
          <ContentInvoicingText theme={theme}>{user?.payments.history.name}</ContentInvoicingText>
          <ContentInvoicingDesc>
            <ContentInvoicingValue theme={theme}>{price}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{locale.invoicing.description}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{method}</ContentInvoicingValue>
          </ContentInvoicingDesc>
        </ContentInvoicingHistory>
        <ContentInvoicingValue theme={theme}>{user?.payments.history.createdAt}</ContentInvoicingValue>
      </ContentInvoicingSection>
    </ContentInvoicing>
  );
};

export default Invoicing;