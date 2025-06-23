// google-pay.js

// Конфигурация Google Pay

//ЭТО НУЖНО ИГНОРИРОВАТЬ, ТАК КАК ЭТОТ ФАЙЛ НЕ БУДЕТ ИСПОЛЬЗОВАТЬСЯ В ПРОЕКТЕ 
//ЭТО НУЖНО ИГНОРИРОВАТЬ, ТАК КАК ЭТОТ ФАЙЛ НЕ БУДЕТ ИСПОЛЬЗОВАТЬСЯ В ПРОЕКТЕ 
//ЭТО НУЖНО ИГНОРИРОВАТЬ, ТАК КАК ЭТОТ ФАЙЛ НЕ БУДЕТ ИСПОЛЬЗОВАТЬСЯ В ПРОЕКТЕ (пока что, потом как нибудь доделаю поддержку Google Pay, но пока что не нужно)

const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

const allowedCardNetworks = ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'example', // Замените на ваш шлюз, например 'stripe'
    'gatewayMerchantId': 'exampleGatewayMerchantId' // Замените на ваш Merchant ID
  }
};

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

const cardPaymentMethod = Object.assign(
  {},
  baseCardPaymentMethod,
  {
    tokenizationSpecification: tokenizationSpecification
  }
);

// Создаем Google Pay клиент
let paymentsClient;

function onGooglePayLoaded() {
  paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

  paymentsClient.isReadyToPay({
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [baseCardPaymentMethod]
  })
  .then(function(response) {
    if (!response.result) {
      alert('Google Pay не доступен на этом устройстве.');
    }
  })
  .catch(function(err) {
    console.error('isReadyToPay error:', err);
  });
}

// Обработчик кнопок "Придбати"
function setupBuyButtons() {
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tierCard = button.closest('.vip-card');
      const tierName = tierCard.querySelector('.vip-header h3').textContent;
      const priceText = tierCard.querySelector('.price').textContent.trim();

      const paymentDataRequest = Object.assign({}, baseRequest);
      paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
      paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: priceText.replace('$', ''), // Цена без знака $
        currencyCode: 'USD',
        countryCode: 'US'
      };
      paymentDataRequest.merchantInfo = {
        merchantId: '01234567890123456789', // Замените на ваш merchant ID
        merchantName: 'Rustoria UA'
      };

      paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function(paymentData) {
          console.log('Оплата успешна:', paymentData);
          alert(`Дякуємо за покупку рівня ${tierName}!`);
          // TODO: Отправить данные на сервер для подтверждения заказа
        })
        .catch(function(err) {
          console.error('Ошибка оплаты:', err.statusCode, err.message);
        });
    });
  });
}

// Ждем загрузки Google Pay JS и DOM
window.addEventListener('load', () => {
  if (window.google && google.payments && google.payments.api) {
    onGooglePayLoaded();
    setupBuyButtons();
  } else {
    // Если Google Pay скрипт ещё не загружен — подождать
    window.addEventListener('google-pay-loaded', () => {
      onGooglePayLoaded();
      setupBuyButtons();
    });
  }
});
