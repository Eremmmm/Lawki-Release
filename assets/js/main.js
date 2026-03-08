/**
 * Lawki Landing Page — main.js
 *
 * Responsibilities (SRP — one module per concern):
 *   1. navScroll    — adds "scrolled" class to nav on scroll
 *   2. revealOnScroll — triggers fade-in for .reveal elements via IntersectionObserver
 *   3. smoothScroll  — handles in-page anchor navigation
 */

(function () {
  'use strict';

  /* ── 1. NAV SCROLL EFFECT ─────────────────────────────────── */
  const navScroll = (function () {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const THRESHOLD = 10;

    function update() {
      if (window.scrollY > THRESHOLD) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update(); // run once on load
  })();

  /* ── 2. REVEAL ON SCROLL ──────────────────────────────────── */
  const revealOnScroll = (function () {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, options);

    elements.forEach(function (el) { observer.observe(el); });
  })();

  /* ── 3. SMOOTH SCROLL ─────────────────────────────────────── */
  const smoothScroll = (function () {
    const navHeight = 68;

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  })();

})();
