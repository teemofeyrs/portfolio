import Modal from "./Modal";
import './../bootstrap/bootstrap';
import './../css/style.scss';
import arkenea from './../assets/work/arkenea.png';
import studioRoma from './../assets/work/studio_Roma.png';
import jobOffer from './../assets/work/jobOffer.png';

//nav change bg after scroll
document.addEventListener('scroll', edinNav)

function edinNav(e) {
    let nav = document.querySelector('.navbar');
    if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
        nav.classList.add('bg-white');
    } else if (document.body.scrollTop < 120 || document.documentElement.scrollTop < 120) {
        nav.classList.remove('bg-white');
    }
}

//portfolio section (modal and dinamic work card)
const myWork = [
    {
        id: 1,
        siteName: 'Arkenea',
        finish: 'Done',
        technologies: 'html, css, scss, jquery, slick slider lib. ',
        image: arkenea,
    },
    {
        id: 2,
        siteName: 'studio Roma',
        finish: 'Done',
        technologies: 'html, css, scss,bootstrap, jquery, aos  lib. ',
        image: studioRoma,
    },
    {
        id: 3,
        siteName: 'Job Offer',
        finish: 'In process...',
        technologies: 'html, css, react(HOC, hooks, PureComponent, ...), redux(redux-form, redux-thunk ), TypeScript, API lib. - axios ',
        image: jobOffer,
    }
]
const toHtml = (work) => {
    let str = work.technologies.slice(0, 30);
    return `<div class="col-md-4">
        <div class="card">
            <img class="card-img-top" src=${work.image} alt=${work.siteName}>
            <div class="card-body">
                <h5 class="card-title">${work.siteName}</h5>
                <p class="card-text"><small>${work.finish}</small><br>
                  ${str}<span>...</span>
                </p>
                <button class="btn btn-primary" data-open="more" data-id=${work.id}>More...</button>
            </div>
        </div>
    </div>`
}
function renderWorks() {
    let $html =myWork.map(work => (toHtml(work))).join('');
    document.querySelector('#portfolio').innerHTML = $html;
}
renderWorks();
document.querySelector('#portfolio').addEventListener('click', openModal);
function openModal(e){
    e.preventDefault();
    if(e.target.dataset.open === 'more'){
        let $id = +e.target.dataset.id;
        const currentWork = myWork.find(work => work.id === $id);
        modal.setContent(`<h2><u>Site name:</u> ${currentWork.siteName}</h2><p><u>Technologies:</u> ${currentWork.technologies}</p>`)

        modal.open();
    }
}

function OpenInNewTabWinBrowser(url) {
    var win = window.open(url, '_blank');
    win.focus();
}
const modal = Modal.skillsModal({
    title: 'Work site',
    closable: true,
    content: `<h2>my site arkena</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, nostrum.</p>`,
    width: '500px',
    footer: [
        {
            content: `View code <i class="fa fa-eye ml-1" aria-hidden="true"></i>`,
            classBtn: 'danger',
            handler() {
                console.log('Vwiew code');
            }
        },
        {
            content: `Visit site <i class="fa fa-list-alt ml-1" aria-hidden="true"></i>`,
            classBtn: 'success',
            handler() {
                console.log('Visit site');
            }
        }
    ]
});

