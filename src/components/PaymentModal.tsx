import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CreditCard, Building2, Wallet, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PaymentModalProps {
  course: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentModal({ course, onClose, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate Razorpay payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      toast.success('Payment successful! Welcome to the course!');
      
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4 py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600">
                You've been enrolled in {course.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            Choose your payment method to enroll in the course
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-gray-900 mb-2">{course.title}</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Course Fee</span>
              <span className="text-2xl text-gray-900">₹{course.price.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <Label>Select Payment Method</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-sm">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Wallet className="w-6 h-6" />
                <span className="text-sm">UPI</span>
              </button>
              <button
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building2 className="w-6 h-6" />
                <span className="text-sm">Net Banking</span>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                </div>
              </div>
              <div>
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input id="upiId" placeholder="yourname@upi" />
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="bank">Select Bank</Label>
                <select
                  id="bank"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Razorpay Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Secured by</span>
            <span className="text-blue-600">Razorpay</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={processing}>
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={processing}
            >
              {processing ? 'Processing...' : `Pay ₹${course.price.toLocaleString()}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
