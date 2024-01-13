const btnfilter= document.getElementById("filter-button")

btnfilter.addEventListener("click", () => {
    document.querySelector(".filter-menu").classList.toggle("active")
}); 


const add_item = document.querySelector('.add-item');
const modal = document.querySelector('.modal');

add_item.addEventListener('pointerdown', () => {
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 0)
});

modal.querySelector('.close').addEventListener('pointerdown', () => {
    hideModal();
});

modal.querySelector('.cancel').addEventListener('pointerdown', () => {
    hideModal();
});

document.addEventListener('pointerdown', (e) => {
    if (!e.composedPath().includes(modal)) {
        hideModal();  
    }
});

modal.addEventListener('transitionend', function(e) {
    if (!this.classList.contains('show')) {
        if (e.propertyName == 'transform') {
        this.style.display = '';
        }
    }
});

function hideModal() {
    modal.classList.remove('show')
}