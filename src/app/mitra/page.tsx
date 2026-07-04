"use client";

import { useState, useMemo } from 'react';
import { mockMitra, Mitra, MitraType } from '@/data/mock-mitra';
import { formatCurrency } from '@/lib/utils';
import styles from './page.module.css';

// ── Helpers ──────────────────────────────────────────────────
const TYPE_META: Record<MitraType, { icon: string; color: string; bg: string; desc: string }> = {
  'Arsitek':       { icon: '🏛️', color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', desc: 'Desain & Perencanaan' },
  'Kontraktor':    { icon: '🏗️', color: '#0f766e', bg: 'rgba(15,118,110,0.1)', desc: 'Pelaksana Konstruksi' },
  'Toko Bangunan': { icon: '🏪', color: '#d97706', bg: 'rgba(217,119,6,0.1)',  desc: 'Supplier Material' },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: '0.85rem', letterSpacing: '-1px' }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function MitraPage() {
  const [activeType, setActiveType] = useState<MitraType | 'Semua'>('Semua');
  const [search, setSearch] = useState('');
  const [selectedMitra, setSelectedMitra] = useState<Mitra | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'projects' | 'value'>('rating');

  const filtered = useMemo(() => {
    return mockMitra
      .filter(m => (activeType === 'Semua' || m.type === activeType))
      .filter(m =>
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.location.toLowerCase().includes(search.toLowerCase()) ||
        m.specializations.some(s => s.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
        return b.totalProjectValue - a.totalProjectValue;
      });
  }, [activeType, search, sortBy]);

  const counts = {
    Semua: mockMitra.length,
    Arsitek: mockMitra.filter(m => m.type === 'Arsitek').length,
    Kontraktor: mockMitra.filter(m => m.type === 'Kontraktor').length,
    'Toko Bangunan': mockMitra.filter(m => m.type === 'Toko Bangunan').length,
  };

  return (
    <div className={styles.page}>

      {/* ── HERO BANNER ── */}
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>✅ Mitra Terverifikasi Wakaf Konstruksi</span>
          <h1 className={styles.heroTitle}>Marketplace Mitra</h1>
          <p className={styles.heroDesc}>
            Direktori mitra konstruksi, arsitek, dan supplier material yang telah diverifikasi.
            Setiap transaksi tercatat transparan dan dapat ditelusuri oleh para wakif.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>{mockMitra.length}</strong>
              <span>Mitra Terdaftar</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <strong>{mockMitra.filter(m => m.verificationStatus === 'verified').length}</strong>
              <span>Terverifikasi</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <strong>{formatCurrency(mockMitra.reduce((s, m) => s + m.totalProjectValue, 0))}</strong>
              <span>Total Nilai Proyek</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>

        {/* ── FILTER & SEARCH BAR ── */}
        <div className={styles.controlBar}>
          <div className={styles.typeTabs}>
            {(['Semua', 'Arsitek', 'Kontraktor', 'Toko Bangunan'] as const).map(t => (
              <button
                key={t}
                className={`${styles.typeTab} ${activeType === t ? styles.typeTabActive : ''}`}
                onClick={() => setActiveType(t)}
              >
                {t !== 'Semua' && <span>{TYPE_META[t as MitraType].icon}</span>}
                {t}
                <span className={styles.typeTabCount}>{counts[t]}</span>
              </button>
            ))}
          </div>
          <div className={styles.controlRight}>
            <input
              className={styles.searchInput}
              placeholder="🔎  Cari nama, lokasi, atau spesialisasi..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="rating">Urutkan: Rating</option>
              <option value="projects">Urutkan: Proyek Selesai</option>
              <option value="value">Urutkan: Nilai Proyek</option>
            </select>
          </div>
        </div>

        {/* ── CATEGORY CARDS (overview) ── */}
        <div className={styles.categoryGrid}>
          {(['Arsitek', 'Kontraktor', 'Toko Bangunan'] as MitraType[]).map(type => {
            const meta = TYPE_META[type];
            const list = mockMitra.filter(m => m.type === type);
            const avgRating = (list.reduce((s, m) => s + m.rating, 0) / list.length).toFixed(1);
            return (
              <button
                key={type}
                className={`${styles.categoryCard} ${activeType === type ? styles.categoryCardActive : ''}`}
                onClick={() => setActiveType(type)}
                style={{ borderTop: `4px solid ${meta.color}` }}
              >
                <span className={styles.catIcon}>{meta.icon}</span>
                <div className={styles.catInfo}>
                  <strong>{type}</strong>
                  <span>{meta.desc}</span>
                </div>
                <div className={styles.catStats}>
                  <span className={styles.catCount}>{list.length} Mitra</span>
                  <span className={styles.catRating} style={{ color: meta.color }}>★ {avgRating}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── MITRA GRID ── */}
        <p className={styles.resultCount}>
          Menampilkan <strong>{filtered.length}</strong> mitra
          {activeType !== 'Semua' ? ` · ${activeType}` : ''}
        </p>

        <div className={styles.mitraGrid}>
          {filtered.map(mitra => {
            const meta = TYPE_META[mitra.type];
            return (
              <div key={mitra.id} className={styles.mitraCard} onClick={() => setSelectedMitra(mitra)}>
                <div className={styles.cardHeader} style={{ background: meta.bg }}>
                  <div className={styles.mitraLogoWrap} style={{ borderColor: meta.color }}>
                    <span className={styles.mitraLogo}>{mitra.logo}</span>
                  </div>
                  <div className={styles.verificationBadge}>
                    {mitra.verificationStatus === 'verified' && <span className={styles.badgeVerified}>✓ Terverifikasi</span>}
                    {mitra.verificationStatus === 'pending' && <span className={styles.badgePending}>⏳ Proses Verifikasi</span>}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.mitraTypePill} style={{ color: meta.color, background: meta.bg }}>
                    {meta.icon} {mitra.type}
                  </div>
                  <h3 className={styles.mitraName}>{mitra.name}</h3>
                  <p className={styles.mitraTagline}>{mitra.tagline}</p>
                  <p className={styles.mitraLocation}>📍 {mitra.location}</p>

                  <div className={styles.mitraRatingRow}>
                    <StarRating rating={mitra.rating} />
                    <span className={styles.ratingNum}>{mitra.rating}</span>
                    <span className={styles.reviewCount}>({mitra.reviewCount} ulasan)</span>
                  </div>

                  <div className={styles.mitraStatsRow}>
                    <div className={styles.mitraStat}>
                      <strong>{mitra.completedProjects}</strong>
                      <span>Proyek Selesai</span>
                    </div>
                    <div className={styles.mitraStat}>
                      <strong>{formatCurrency(mitra.totalProjectValue)}</strong>
                      <span>Total Nilai</span>
                    </div>
                  </div>

                  <div className={styles.certBadges}>
                    {mitra.sniCertified && <span className={styles.certBadge} style={{ color: '#0f766e', background: 'rgba(15,118,110,0.1)' }}>🏅 SNI</span>}
                    {mitra.pbgExperience && <span className={styles.certBadge} style={{ color: '#7c3aed', background: 'rgba(124,58,237,0.1)' }}>📋 PBG/IMB</span>}
                    {mitra.projects.length > 0 && <span className={styles.certBadge} style={{ color: '#1d4ed8', background: 'rgba(29,78,216,0.1)' }}>🕌 Proyek Aktif</span>}
                  </div>

                  <div className={styles.specialTags}>
                    {mitra.specializations.slice(0, 3).map(s => (
                      <span key={s} className={styles.specialTag}>{s}</span>
                    ))}
                    {mitra.specializations.length > 3 && (
                      <span className={styles.specialTag}>+{mitra.specializations.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <button className={styles.detailBtn} onClick={() => setSelectedMitra(mitra)}>
                    Lihat Detail & Portofolio →
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className={styles.emptyState}>
              <span>🔍</span>
              <p>Tidak ada mitra yang cocok dengan pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {selectedMitra && (
        <div className={styles.modalOverlay} onClick={() => setSelectedMitra(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedMitra(null)}>✕</button>

            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalLogoWrap} style={{ borderColor: TYPE_META[selectedMitra.type].color }}>
                <span className={styles.modalLogo}>{selectedMitra.logo}</span>
              </div>
              <div className={styles.modalHeaderInfo}>
                <div className={styles.mitraTypePill} style={{ color: TYPE_META[selectedMitra.type].color, background: TYPE_META[selectedMitra.type].bg }}>
                  {TYPE_META[selectedMitra.type].icon} {selectedMitra.type}
                </div>
                <h2 className={styles.modalTitle}>{selectedMitra.name}</h2>
                <p className={styles.modalTagline}>{selectedMitra.tagline}</p>
                <div className={styles.mitraRatingRow}>
                  <StarRating rating={selectedMitra.rating} />
                  <span className={styles.ratingNum}>{selectedMitra.rating}</span>
                  <span className={styles.reviewCount}>({selectedMitra.reviewCount} ulasan)</span>
                  {selectedMitra.verificationStatus === 'verified' && (
                    <span className={styles.badgeVerified} style={{ marginLeft: '0.5rem' }}>✓ Terverifikasi</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {/* About */}
              <div className={styles.modalSection}>
                <h4>Tentang Mitra</h4>
                <p>{selectedMitra.description}</p>
              </div>

              {/* Contact & Info */}
              <div className={styles.modalSection}>
                <h4>Informasi Kontak</h4>
                <div className={styles.contactGrid}>
                  <div className={styles.contactItem}><span>📍</span><span>{selectedMitra.location}</span></div>
                  <div className={styles.contactItem}><span>📞</span><span>{selectedMitra.phone}</span></div>
                  <div className={styles.contactItem}><span>✉️</span><span>{selectedMitra.email}</span></div>
                  {selectedMitra.website && <div className={styles.contactItem}><span>🌐</span><span>{selectedMitra.website}</span></div>}
                  <div className={styles.contactItem}><span>📅</span><span>Berdiri sejak {selectedMitra.foundedYear}</span></div>
                  <div className={styles.contactItem}><span>👥</span><span>{selectedMitra.employeeCount} karyawan</span></div>
                </div>
              </div>

              {/* Stats */}
              <div className={styles.modalSection}>
                <h4>Statistik Kinerja</h4>
                <div className={styles.statCards}>
                  <div className={styles.statCard}><strong>{selectedMitra.completedProjects}</strong><span>Proyek Selesai</span></div>
                  <div className={styles.statCard}><strong>{formatCurrency(selectedMitra.totalProjectValue)}</strong><span>Total Nilai Proyek</span></div>
                  <div className={styles.statCard}><strong>{selectedMitra.rating} / 5</strong><span>Rating Rata-rata</span></div>
                </div>
              </div>

              {/* Certifications */}
              <div className={styles.modalSection}>
                <h4>Sertifikasi & Keahlian</h4>
                <div className={styles.certRow}>
                  {selectedMitra.sniCertified && <span className={styles.certBig} style={{ color: '#0f766e', background: 'rgba(15,118,110,0.1)', border: '1px solid rgba(15,118,110,0.2)' }}>🏅 Bersertifikasi SNI</span>}
                  {selectedMitra.pbgExperience && <span className={styles.certBig} style={{ color: '#7c3aed', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>📋 Berpengalaman PBG/IMB</span>}
                  {selectedMitra.specializations.map(s => (
                    <span key={s} className={styles.certBig}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Active Projects on Wakaf Konstruksi */}
              {selectedMitra.projects.length > 0 && (
                <div className={styles.modalSection}>
                  <h4>📌 Proyek Wakaf yang Ditangani</h4>
                  <div className={styles.projectList}>
                    {selectedMitra.projects.map(p => (
                      <div key={p.campaignId} className={styles.projectItem}>
                        <div className={styles.projectItemLeft}>
                          <strong>{p.campaignTitle}</strong>
                          <span className={styles.projectRole}>{p.role}</span>
                        </div>
                        <div className={styles.projectItemRight}>
                          <span className={styles.projectValue}>{formatCurrency(p.value)}</span>
                          <span className={`${styles.projectStatus} ${p.status === 'active' ? styles.projectActive : styles.projectDone}`}>
                            {p.status === 'active' ? '⚡ Aktif' : '✓ Selesai'} · {p.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transparency Notice */}
              <div className={styles.transparencyBox}>
                <span>🔍</span>
                <div>
                  <strong>Transparansi Dana Wakaf</strong>
                  <p>Seluruh transaksi dengan mitra ini tercatat di sistem Escrow Wakaf Konstruksi dan dapat ditelusuri oleh para wakif melalui halaman Berita Program.</p>
                </div>
              </div>

              {/* Reviews */}
              {selectedMitra.reviews.length > 0 && (
                <div className={styles.modalSection}>
                  <h4>💬 Ulasan Klien</h4>
                  <div className={styles.reviewList}>
                    {selectedMitra.reviews.map((r, i) => (
                      <div key={i} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                          <strong>{r.reviewer}</strong>
                          <div>
                            <StarRating rating={r.rating} />
                            <span className={styles.reviewDate}> · {new Date(r.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                        </div>
                        <p className={styles.reviewComment}>"{r.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <a href={`mailto:${selectedMitra.email}`} className={styles.contactBtn}>
                ✉️ Hubungi Mitra
              </a>
              <button className={styles.closeBtn} onClick={() => setSelectedMitra(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
