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
  ContentInvoicingDesc,
  ContentInvoicingStatus,
  ContentInvoicingAmount
} from '../../../components';

const Plans = () => {
  const {locale} = useContext(LocaleContext);
  const {user} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);
  const [price, setPrice] = useState(null);
  const [editPayment, setEditPayment] = useState(false);

  const handlePayment = () => {
    setEditPayment(!editPayment);
  };

  const sortedHistory = user?.payments.history.slice();
  sortedHistory.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    
    return dateB - dateA;
  });

  const mostRecentItem = sortedHistory[0];

  useEffect(() => {
    setPrice('$'+mostRecentItem.price);
  }, [user]);
    
  return (
    <ContentInvoicing>
      {editPayment?<Payment payment={mostRecentItem.method} setEditPayment={setEditPayment} />:null}
      <ContentInvoicingProfile>
        <ContentInvoicingTitle theme={theme}>{locale.plans.title}</ContentInvoicingTitle>
      </ContentInvoicingProfile>
      <ContentInvoicingButton theme={theme} onPress={handlePayment}>
        <ContentInvoicingHistory>
          <ContentInvoicingText theme={theme}>{mostRecentItem.name}</ContentInvoicingText>
          <ContentInvoicingDesc>
            <ContentInvoicingValue theme={theme}>{price}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{locale.invoicing.cycle}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{mostRecentItem.credits}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{locale.invoicing.asks}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{locale.invoicing.description}</ContentInvoicingValue>
            <ContentInvoicingValue theme={theme}>{mostRecentItem.method?.toUpperCase()}</ContentInvoicingValue>
          </ContentInvoicingDesc>
          <ContentInvoicingStatus>
            <ContentInvoicingAmount theme={theme}>{user?.credits}</ContentInvoicingAmount>
            <ContentInvoicingAmount theme={theme}>{locale.plans.credits}</ContentInvoicingAmount>
            <ContentInvoicingAmount theme={theme}>{locale.plans.art}</ContentInvoicingAmount>
          </ContentInvoicingStatus>
        </ContentInvoicingHistory>
        <ContentInvoicingButtonText color="payment" theme={theme}>{locale.plans.button}</ContentInvoicingButtonText>
      </ContentInvoicingButton>
    </ContentInvoicing>
  );
};

export default Plans;