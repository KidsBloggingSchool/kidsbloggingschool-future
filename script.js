const skillData = {
  think: {
    number: '01 / МЫСЛИТЬ',
    title: 'Задавать вопросы и проверять ответы',
    body: 'Сравнивать источники, замечать связи и искать несколько решений.',
    tags: ['Аналитика', 'Критическое мышление', 'Системность', 'Решение задач'],
    example: 'Ребёнок сравнивает источники для ролика, выбирает аргументы и объясняет, почему доверяет именно им.'
  },
  create: {
    number: '02 / СОЗДАВАТЬ',
    title: 'Превращать идеи в истории и визуалы',
    body: 'Придумывать варианты, выбирать подходящий и улучшать его.',
    tags: ['Креативность', 'Сторителлинг', 'Визуальное мышление', 'Вкус'],
    example: 'Ребёнок придумывает три подачи одной темы, выбирает лучшую, снимает и улучшает ролик после обратной связи.'
  },
  tech: {
    number: '03 / ТЕХНОЛОГИИ',
    title: 'Использовать AI и цифровые инструменты осмысленно',
    body: 'Понимать возможности инструментов, проверять результат и беречь данные.',
    tags: ['AI-грамотность', 'Цифровые инструменты', 'Данные', 'Безопасность'],
    example: 'Ребёнок просит AI предложить идеи, проверяет результат, дорабатывает его вручную и не загружает личные данные.'
  },
  collab: {
    number: '04 / ВЗАИМОДЕЙСТВОВАТЬ',
    title: 'Объяснять идеи, слушать других и работать вместе',
    body: 'Слушать других, объяснять свою идею и договариваться о совместной работе.',
    tags: ['Коммуникация', 'Эмпатия', 'Команда', 'Лидерство'],
    example: 'Ребёнок презентует идею команде, распределяет роли, принимает комментарии и помогает собрать единый проект.'
  },
  grow: {
    number: '05 / РАЗВИВАТЬСЯ',
    title: 'Учиться, адаптироваться и не бояться переделывать',
    body: 'Пробовать новые инструменты и использовать ошибки, чтобы улучшать проект.',
    tags: ['Любознательность', 'Самообучение', 'Адаптивность', 'Устойчивость'],
    example: 'Ребёнок разбирается в новом редакторе, тестирует несколько подходов и воспринимает ошибку как материал для следующей версии.'
  }
};

function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }

// Content remains readable when JavaScript or IntersectionObserver is unavailable.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), {threshold: .12});
  qsa('.reveal').forEach(el => { observer.observe(el); el.classList.add('reveal-ready'); });
}
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  qs('#readingProgress').style.width = `${total > 0 ? Math.max(0, Math.min(100, window.scrollY / total * 100)) : 0}%`;
}
window.addEventListener('scroll', updateProgress, {passive: true});
window.addEventListener('resize', updateProgress);
updateProgress();

// Preserve the five-skill map, with arrow-key navigation between tabs.
const skillTabs = qsa('.skill-node');
function selectSkill(btn) {
  skillTabs.forEach(tab => {
    const selected = tab === btn;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  const data = skillData[btn.dataset.skill];
  const detail = qs('#skillDetail');
  detail.setAttribute('aria-labelledby', btn.id);
  detail.innerHTML = `<p class="detail-number">${data.number}</p><h3>${data.title}</h3><p>${data.body}</p><div class="skill-tags">${data.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="project-example"><span>Как проявляется в проекте</span><p>${data.example}</p></div>`;
}
skillTabs.forEach((btn, index) => {
  btn.addEventListener('click', () => selectSkill(btn));
  btn.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % skillTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + skillTabs.length) % skillTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = skillTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    skillTabs[next].focus();
    selectSkill(skillTabs[next]);
  });
});
selectSkill(skillTabs[0]);
