import GooglePayButton from '@google-pay/button-react';
import { useRouter } from 'next/router';

type Query = {
    query :[
        "pro" | "premium",
        "checkout",
        "success" | "cancel" | "error" | "pending" | "processing",
    ] ,
    method: "stripe" | "paypal" | "googlepay" | "applepay"
}


export default function Upgrade() {
    const router = useRouter();
    
    console.log(router.query);
    
    return (
        <div>
            <h1>Upgrade</h1>
            <GooglePayButtonComponent />
        </div>
    );
}
function GooglePayButtonComponent({ }){
    return (
        <GooglePayButton
            environment="TEST"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                    }
                ],
                merchantInfo: {
                    merchantId: '12345678901234567890',
                    merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '100.00',
                    currencyCode: 'USD',
                    countryCode: 'US',
                },
            }}
            onLoadPaymentData={paymentRequest => {
                console.log('load payment data', paymentRequest);
            }}
        />
    );
};

