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

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, campaignTitle }) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(0);
  const [wakifName, setWakifName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!isOpen) return null;

  const handleDonate = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Save to local storage for dashboard
      const contributions = JSON.parse(localStorage.getItem('wakaf_contributions') || '[]');
      contributions.push({
        id: Math.random().toString(36).substr(2, 9),
        campaignTitle,
        amount,
        wakifName: wakifName.trim() || t('donation.placeholder'),
        date: new Date().toISOString()
      });
      localStorage.setItem('wakaf_contributions', JSON.stringify(contributions));
      
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setAmount(0);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose}>&times;</button>
        
        {isSuccess ? (
          <div className={styles.successState}>
            <div className={styles.checkIcon}>✓</div>
            <h3>{t('donation.success')}</h3>
            <p>{t('donation.successDesc')} Rp {amount.toLocaleString('id-ID')} {t('donation.untuk')} <strong>{campaignTitle}</strong> {t('donation.berhasilDisalurkan')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Button variant="outline" fullWidth onClick={() => setShowCertificate(true)}>{t('donation.lihatPiagam')}</Button>
              <Button fullWidth onClick={handleClose}>{t('donation.tutup')}</Button>
            </div>
          </div>
        ) : (
          <div className={styles.formState}>
            <h3>{t('donation.mulaiWakaf')}</h3>
            <p className={styles.subtitle}>{t('donation.forCampaign')} {campaignTitle}</p>
            
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

            <Button 
              fullWidth 
              onClick={handleDonate} 
              disabled={amount <= 0 || isProcessing}
            >
              {isProcessing ? t('donation.processing') : t('donation.lanjutPembayaran')}
            </Button>
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
