"use client";

import React, { useState } from 'react';
import styles from './DonationModal.module.css';
import { Button } from '@/components/ui/Button';
import { CertificateModal } from './CertificateModal';
import { useLanguage } from '@/context/LanguageContext';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
}

type Step = 'form' | 'payment' | 'confirm' | 'success';

interface PaymentMethod {
  id: string;
  name: string;
  shortName: string;
  type: 'bank_transfer' | 'cash';
  accountNumber?: string;
  accountName?: string;
  logo: string;
  color: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'bca',
    name: 'Bank Central Asia (BCA)',
    shortName: 'BCA',
    type: 'bank_transfer',
    accountNumber: '1234567890',
    accountName: 'Yayasan Wakaf Konstruksi',
    logo: '🏦',
    color: '#005DAA',
    description: 'Transfer via ATM, m-BCA, atau KlikBCA',
  },
  {
    id: 'bsi',
    name: 'Bank Syariah Indonesia (BSI)',
    shortName: 'BSI',
    type: 'bank_transfer',
    accountNumber: '7890123456',
    accountName: 'Yayasan Wakaf Konstruksi',
    logo: '🕌',
    color: '#00923F',
    description: 'Transfer via BSI Mobile, ATM, atau teller',
  },
  {
    id: 'muamalat',
    name: 'Bank Muamalat',
    shortName: 'Muamalat',
    type: 'bank_transfer',
    accountNumber: '4567890123',
    accountName: 'Yayasan Wakaf Konstruksi',
    logo: '☪️',
    color: '#8B1A1A',
    description: 'Transfer via Muamalat DIN atau ATM',
  },
  {
    id: 'cash',
    name: 'Pembayaran Langsung di Bank',
    shortName: 'Cash/Teller',
    type: 'cash',
    logo: '💵',
    color: '#374151',
    description: 'Datang langsung ke cabang bank terdekat',
  },
];

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, campaignTitle }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('form');
  const [amount, setAmount] = useState<number>(0);
  const [wakifName, setWakifName] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!isOpen) return null;

  const handleLanjutkan = () => {
    if (amount <= 0) return;
    setStep('payment');
  };

  const handleSelectPayment = (method: PaymentMethod) => {
    setSelectedPayment(method);
    setStep('confirm');
  };

  const handleConfirmDonate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');

      const contributions = JSON.parse(localStorage.getItem('wakaf_contributions') || '[]');
      contributions.push({
        id: Math.random().toString(36).substr(2, 9),
        campaignTitle,
        amount,
        wakifName: wakifName.trim() || t('donation.placeholder'),
        date: new Date().toISOString(),
        paymentMethod: selectedPayment?.name,
      });
      localStorage.setItem('wakaf_contributions', JSON.stringify(contributions));
    }, 1800);
  };

  const handleClose = () => {
    setStep('form');
    setAmount(0);
    setWakifName('');
    setSelectedPayment(null);
    setIsProcessing(false);
    onClose();
  };

  const handleBack = () => {
    if (step === 'payment') setStep('form');
    if (step === 'confirm') setStep('payment');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose}>&times;</button>

        {/* Step Indicator */}
        {step !== 'success' && (
          <div className={styles.stepIndicator}>
            <div className={`${styles.stepDot} ${step === 'form' || step === 'payment' || step === 'confirm' ? styles.stepActive : ''}`}>1</div>
            <div className={`${styles.stepLine} ${step === 'payment' || step === 'confirm' ? styles.stepLineFilled : ''}`}></div>
            <div className={`${styles.stepDot} ${step === 'payment' || step === 'confirm' ? styles.stepActive : ''}`}>2</div>
            <div className={`${styles.stepLine} ${step === 'confirm' ? styles.stepLineFilled : ''}`}></div>
            <div className={`${styles.stepDot} ${step === 'confirm' ? styles.stepActive : ''}`}>3</div>
          </div>
        )}

        {/* STEP 1: Form Nominal */}
        {step === 'form' && (
          <div className={styles.formState}>
            <h3>{t('donation.mulaiWakaf')}</h3>
            <p className={styles.subtitle}>{t('donation.forCampaign')} <strong>{campaignTitle}</strong></p>

            <div className={styles.amountPresets}>
              {[50000, 100000, 250000, 500000, 1000000, 2000000].map(val => (
                <button
                  key={val}
                  className={`${styles.presetBtn} ${amount === val ? styles.active : ''}`}
                  onClick={() => setAmount(val)}
                >
                  Rp {val.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            <div className={styles.inputGroup}>
              <label>{t('donation.customAmount')}</label>
              <p>{t('donation.customAmountDesc')}</p>
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder={t('donation.minimum')}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>{t('donation.namaWakif')}</label>
              <input
                type="text"
                value={wakifName}
                onChange={(e) => setWakifName(e.target.value)}
                placeholder={t('donation.placeholder')}
                className={styles.input}
              />
            </div>

            <Button fullWidth onClick={handleLanjutkan} disabled={amount <= 0}>
              {t('donation.lanjutPembayaran')}
            </Button>
          </div>
        )}

        {/* STEP 2: Pilih Metode Pembayaran */}
        {step === 'payment' && (
          <div className={styles.formState}>
            <button className={styles.backBtn} onClick={handleBack}>← Kembali</button>
            <h3>Pilih Metode Pembayaran</h3>
            <p className={styles.subtitle}>
              Nominal: <strong>Rp {amount.toLocaleString('id-ID')}</strong>
            </p>

            <div className={styles.paymentList}>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`${styles.paymentCard} ${selectedPayment?.id === method.id ? styles.paymentCardActive : ''}`}
                  onClick={() => handleSelectPayment(method)}
                >
                  <div className={styles.paymentLogoWrap} style={{ background: method.color + '18', border: `1.5px solid ${method.color}30` }}>
                    <span className={styles.paymentLogo}>{method.logo}</span>
                  </div>
                  <div className={styles.paymentInfo}>
                    <span className={styles.paymentName}>{method.shortName}</span>
                    <span className={styles.paymentDesc}>{method.description}</span>
                  </div>
                  <span className={styles.paymentArrow}>›</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Konfirmasi Transfer */}
        {step === 'confirm' && selectedPayment && (
          <div className={styles.formState}>
            <button className={styles.backBtn} onClick={handleBack}>← Kembali</button>
            <h3>Konfirmasi Pembayaran</h3>
            <p className={styles.subtitle}>via <strong>{selectedPayment.name}</strong></p>

            <div className={styles.confirmBox}>
              <div className={styles.confirmBankHeader} style={{ background: selectedPayment.color }}>
                <span className={styles.confirmBankLogo}>{selectedPayment.logo}</span>
                <span className={styles.confirmBankName}>{selectedPayment.shortName}</span>
              </div>

              {selectedPayment.type === 'bank_transfer' && (
                <div className={styles.confirmDetails}>
                  <div className={styles.confirmRow}>
                    <span>No. Rekening</span>
                    <strong className={styles.copyableText}>{selectedPayment.accountNumber}</strong>
                  </div>
                  <div className={styles.confirmRow}>
                    <span>Atas Nama</span>
                    <strong>{selectedPayment.accountName}</strong>
                  </div>
                  <div className={styles.confirmRowHighlight}>
                    <span>Nominal Transfer</span>
                    <strong>Rp {amount.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className={styles.confirmRow}>
                    <span>Berita Transfer</span>
                    <strong>WAKAF-{campaignTitle.substring(0, 10).replace(/\s/g, '-').toUpperCase()}</strong>
                  </div>
                </div>
              )}

              {selectedPayment.type === 'cash' && (
                <div className={styles.confirmDetails}>
                  <div className={styles.cashInfo}>
                    <p>Silakan datang ke cabang bank terdekat dan lakukan setoran tunai ke rekening berikut:</p>
                    <ul>
                      {paymentMethods.filter(m => m.type === 'bank_transfer').map(m => (
                        <li key={m.id}><strong>{m.shortName}</strong>: {m.accountNumber} a.n. {m.accountName}</li>
                      ))}
                    </ul>
                    <div className={styles.confirmRowHighlight}>
                      <span>Nominal Setoran</span>
                      <strong>Rp {amount.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.confirmNote}>
                <span>⏰</span>
                <span>Konfirmasi wakaf Anda akan diverifikasi dalam <strong>1x24 jam</strong> setelah pembayaran.</span>
              </div>
            </div>

            <Button fullWidth onClick={handleConfirmDonate} disabled={isProcessing}>
              {isProcessing ? 'Memverifikasi...' : '✓ Saya Sudah Melakukan Transfer'}
            </Button>
          </div>
        )}

        {/* STEP: Success */}
        {step === 'success' && (
          <div className={styles.successState}>
            <div className={styles.checkIcon}>✓</div>
            <h3>{t('donation.success')}</h3>
            <p>{t('donation.successDesc')} <strong>Rp {amount.toLocaleString('id-ID')}</strong> {t('donation.untuk')} <strong>{campaignTitle}</strong> {t('donation.berhasilDisalurkan')}</p>
            <div className={styles.successPaymentBadge}>
              <span>{selectedPayment?.logo}</span>
              <span>via {selectedPayment?.shortName}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Button variant="outline" fullWidth onClick={() => setShowCertificate(true)}>{t('donation.lihatPiagam')}</Button>
              <Button fullWidth onClick={handleClose}>{t('donation.tutup')}</Button>
            </div>
          </div>
        )}
      </div>

      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        campaignTitle={campaignTitle}
        amount={amount}
        wakifName={wakifName.trim() || t('donation.placeholder')}
        date={new Date().toISOString()}
      />
    </div>
  );
};
