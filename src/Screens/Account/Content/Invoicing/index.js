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
  
  const paymentMethodImages = {
    paypal: {
      url:require('/assets/images/icons/paypal.png'),
      style: {width: 185, height: 80}
    },
    visa: {
      url:require('/assets/images/icons/visa.png'),
      style: {width: 260, height: 80}
    },
    mastercard: {
      url:require('/assets/images/icons/mastercard.png'),
      style: {width: 135, height: 80}
    },
    gift: {
      url:require('/assets/images/icons/gift.png'),
      style: {width: 80, height: 80}
    },
  };

  const mostRecentMethod = sortedHistory[0]?.method;
  const methodImageSource = 
    paymentMethodImages[mostRecentMethod] ||
    {
      url:require('/assets/images/icons/wallet.png'),
      style: {width: 80, height: 80}
    };

  useEffect(() => {
    setPrice('$'+user?.payments.history[0].price);
  }, [user]);
    
  return (
    <ContentInvoicing>
      {editPayment?<Payment payment={sortedHistory[0].method} setEditPayment={setEditPayment} />:null}
      <ContentInvoicingProfile>
        <ContentInvoicingTitle theme={theme}>{locale.invoicing.title}</ContentInvoicingTitle>
      </ContentInvoicingProfile>
      <ContentInvoicingSection theme={theme}>
        <ContentInvoicingButton theme={theme} onPress={handlePayment}>
          <ContentInvoicingPay>
            <Image style={methodImageSource.style} source={methodImageSource.url} />
          </ContentInvoicingPay>
          <ContentInvoicingButtonText color="payment" theme={theme}>{locale.invoicing.button}</ContentInvoicingButtonText>
        </ContentInvoicingButton>
      </ContentInvoicingSection>
      <ContentInvoicingProfile>
        <ContentInvoicingTitle theme={theme}>{locale.invoicing.history}</ContentInvoicingTitle>
      </ContentInvoicingProfile>
      {sortedHistory.map((item, index) => (
        <ContentInvoicingSection  key={index} theme={theme}>
          <ContentInvoicingHistory>
            <ContentInvoicingText theme={theme}>{item.name}</ContentInvoicingText>
            <ContentInvoicingDesc>
              <ContentInvoicingValue theme={theme}>{price}</ContentInvoicingValue>
              <ContentInvoicingValue theme={theme}>{locale.invoicing.cycle}</ContentInvoicingValue>
              <ContentInvoicingValue theme={theme}>{item.credits}</ContentInvoicingValue>
              <ContentInvoicingValue theme={theme}>{locale.invoicing.asks}</ContentInvoicingValue> 
              <ContentInvoicingValue theme={theme}>{locale.invoicing.description}</ContentInvoicingValue>
              <ContentInvoicingValue theme={theme}>{item.method.toUpperCase()}</ContentInvoicingValue>
            </ContentInvoicingDesc>
          </ContentInvoicingHistory>
          <ContentInvoicingValue theme={theme}>{item.createdAt}</ContentInvoicingValue>
        </ContentInvoicingSection>
      ))}
    </ContentInvoicing>
  );
};

export default Invoicing;