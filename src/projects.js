
//모달

'use strict';

const modal = document.querySelector('#modal');
const pdfViewer = document.querySelector('#pdfViewer');
const imgViewer = document.querySelector('#imgViewer');
const closeBtn = document.querySelector('.close-button');
const modalList = document.querySelector('#modal-project-list');
const projectLinks = document.querySelectorAll('.modal-link');
const modalViewer = document.querySelector('.modal-viewer'); 

// 1. 사이드바 목록 생성
projectLinks.forEach((link) => {
  const title = link.querySelector('.project__title').innerText;
  const src = link.dataset.src;
  const li = document.createElement('li');
  li.innerHTML = `<button type="button" class="sidebar-btn" data-src="${src}">${title}</button>`;
  modalList.appendChild(li);
});

const sidebarBtns = document.querySelectorAll('.sidebar-btn');

// 2. 뷰어 업데이트 함수
function updateModalViewer(source) {
  if (!source) return;

  // 새 이미지를 열 때마다 스크롤을 맨 위로!
  if (modalViewer) {
    modalViewer.scrollTo(0, 0);
  }

  const isPdf = source.toLowerCase().endsWith('.pdf');
  
  if (isPdf) {
    pdfViewer.src = source;
    pdfViewer.style.display = 'block';
    imgViewer.style.display = 'none';
    imgViewer.src = ''; 
  } else {
    imgViewer.src = source;
    imgViewer.style.display = 'block';
    pdfViewer.style.display = 'none';
    pdfViewer.src = ''; 
  }
}

// 3. 메인 클릭 이벤트
projectLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    updateModalViewer(link.dataset.src);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// 4. 사이드바 클릭 이벤트
sidebarBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    updateModalViewer(btn.dataset.src);
    sidebarBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// 5. 닫기
const closeModal = () => {
  modal.style.display = 'none';
  pdfViewer.src = '';
  imgViewer.src = '';
  document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

