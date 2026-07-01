import React, { useRef } from 'react';
import styles from './CertificateModal.module.css';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
  amount: number;
  wakifName: string;
  date: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ 
  isOpen, 
  onClose, 
  campaignTitle, 
  amount, 
  wakifName,
  date 
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.actions}>
          <Button variant="outline" size="sm" onClick={handlePrint}>Unduh / Cetak</Button>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        
        {/* The actual certificate that gets printed */}
        <div className={styles.certificateArea} ref={printRef}>
          <div className={styles.borderOuter}>
            <div className={styles.borderInner}>
              <div className={styles.header}>
                <h1 className={styles.title}>Piagam Wakaf</h1>
                <p className={styles.subtitle}>Diberikan sebagai bentuk apresiasi atas partisipasi wakaf produktif</p>
              </div>

              <div className={styles.body}>
                <p>Telah diterima wakaf tunai sebesar:</p>
                <div className={styles.amount}>{formatCurrency(amount)}</div>
                <p>Dari <strong>{wakifName}</strong></p>
                
                <div className={styles.programBox}>
                  <p>Untuk Program:</p>
                  <h3>{campaignTitle}</h3>
                </div>
              </div>

              <div className={styles.footer}>
                <div className={styles.signature}>
                  <p>Diterbitkan pada:</p>
                  <strong>{formattedDate}</strong>
                </div>
                <div className={styles.stamp}>
                  WakafKu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
