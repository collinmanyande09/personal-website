const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');

const setMenu = (isOpen) => {
  if (!menuButton || !nav) return;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  nav.classList.toggle('mobile-open', isOpen);
};

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    const icon = item.querySelector('summary b');
    if (icon) icon.textContent = item.open ? '−' : '+';
  });
});

document.querySelectorAll('.steps article').forEach((step) => {
  step.tabIndex = 0;
  const selectStep = () => {
    document.querySelectorAll('.steps article').forEach((item) => item.classList.remove('selected'));
    step.classList.add('selected');
  };

  step.addEventListener('mouseenter', selectStep);
  step.addEventListener('focus', selectStep);
  step.addEventListener('click', selectStep);
  step.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectStep();
    }
  });
});

const parcelSection = document.querySelector('#parcel');

if (parcelSection) {
  parcelSection.classList.add('coming-soon');
  parcelSection.setAttribute('aria-label', 'Rideo Parcel — coming soon');

  const eyebrow = parcelSection.querySelector('.eyebrow');
  const heading = parcelSection.querySelector('.parcel-copy h2');
  const description = parcelSection.querySelector('.parcel-copy > p:not(.eyebrow)');
  const cta = parcelSection.querySelector('.parcel-copy .button');

  if (eyebrow) eyebrow.innerHTML = '<span></span> In the pipeline';
  if (heading) heading.innerHTML = 'Rideo Parcel.<br><em>Coming soon.</em>';
  if (description) description.textContent = 'We’re shaping a dependable way to send parcels with the Rideo community. Join the pilot to hear when it launches.';
  if (cta) {
    cta.textContent = 'Parcel coming soon';
    cta.removeAttribute('href');
    cta.setAttribute('aria-disabled', 'true');
    cta.classList.add('is-unavailable');
  }
}

document.querySelectorAll('a[href="#parcel"]').forEach((link) => {
  link.removeAttribute('href');
  link.setAttribute('aria-disabled', 'true');
  link.classList.add('is-unavailable');
  link.textContent = 'Parcel — coming soon';
});

document.querySelectorAll('.driver-content > p, .driver-benefits p').forEach((copy) => {
  copy.textContent = copy.textContent.replace(
    /,? and add parcel deliveries when it works for you\./i,
    '. Parcel delivery is planned for a future release.',
  );
  copy.textContent = copy.textContent.replace(/Deliver parcels when available/i, 'Parcel delivery coming soon');
});

const storiesSection = document.querySelector('.stories');

if (storiesSection) {
  storiesSection.classList.add('coming-soon');
  storiesSection.setAttribute('aria-label', 'Rideo community stories — coming soon');

  const intro = storiesSection.querySelector('.story-head > p');
  if (intro) intro.textContent = 'This space will open once passengers, drivers and other community members begin sharing their own Rideo experiences.';

  storiesSection.querySelectorAll('.story-cards article').forEach((story) => {
    story.setAttribute('aria-hidden', 'true');
  });
}

document.querySelectorAll('.faq-list details').forEach((item) => {
  const question = item.querySelector('summary')?.textContent.trim();
  const answer = item.querySelector('p');

  if (question === 'What is Rideo Parcel?' && answer) {
    answer.textContent = 'Rideo Parcel is a planned delivery service in our product pipeline. It is not available during the current pilot.';
  }

  if (question === 'Can drivers deliver parcels?' && answer) {
    answer.textContent = 'Not yet. Parcel delivery will be introduced in a future release once the service is ready.';
  }
});
