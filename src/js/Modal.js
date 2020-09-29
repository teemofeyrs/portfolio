Element.prototype.appendAfter = function (element){
    element.parentNode.insertBefore(this, element.nextSibling);
}
function noop(){ }
function _createModalFooter( buttons = []) {
    if(buttons.length === 0 ){
        return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');
    buttons.forEach( btn => {
        let $btn = document.createElement('button');
        $btn.innerHTML = btn.content;
        $btn.classList.add('btn');
        $btn.classList.add(`btn-${btn.classBtn || 'secondary'}`);
        $btn.dataset.url = btn.url;
        $btn.onclick = btn.handler || noop
        wrap.appendChild($btn);
    })
    return wrap;
}

function _createModal(options) {
    const DEFAULT_WIDTH = '400px';
    let modal = document.createElement('div');
    modal.classList.add('modal-window');
    modal.insertAdjacentHTML('afterbegin', `
             <div class="m-overlay" data-close="close">
                <div class="m-window" style="width: ${options.width || DEFAULT_WIDTH}">
                    <div class="modal-header">
                         <span class="modal-title"> ${options.title || ''} </span>
                        ${options.closable ?  `<span class="modal-close ml-auto" data-close="close">&times;</span>` : ''}
                    </div>
                    <div class="modal-body" data-content="content">
                        ${options.content || ''}
                    </div>
                </div>
            </div>
    `)
    document.body.appendChild(modal);
    return modal;
}

const Modal = {};
Modal.skillsModal = function (options) {
    const ANIMATION_SPEED = 300;
    let closing = false;
    let destroy = false;

    let modalWindow = {
        open() {
            !closing && !destroy && $modal.classList.add('open')
        },
        close() {
            closing = true;
            $modal.classList.add('hide')
            $modal.classList.remove('open')
            setTimeout(() => {
                closing = false;$modal.classList.remove('hide')}, ANIMATION_SPEED)
        }
    };

    let closeWindow = (e) => {
        e.preventDefault();
        if(e.target.dataset.close === 'close'){
            modalWindow.close()
        }
    }
    const $modal = new _createModal(options);
    /*const footer = _createModalFooter(options.footer)
    footer.appendAfter(document.querySelector('[data-content]'));*/
    $modal.addEventListener('click' , closeWindow)
    return Object.assign(modalWindow, {
        destroy(){
            $modal.parentNode.removeChild($modal);
            destroy = true;
        },
        setContent(html){
            let content = document.querySelector('[data-content]');
            content.innerHTML = html;
        },
        setFooter(footer){
            let oldFooter = document.querySelector('.modal-footer');
            if(oldFooter){
                oldFooter.parentNode.removeChild(oldFooter);
            }
            const $footer = _createModalFooter(footer)
            $footer.appendAfter(document.querySelector('[data-content]'));
        }
    })

}

export default Modal;