function getValue() {
    let input = document.getElementsByTagName('input')[0];
    var noCourse = document.getElementById('no_course');
    var courseItem = document.getElementsByClassName('course__item');
    var isFound = false;

    input.addEventListener('keyup', event => {
        let isFound = false;
        var inputUser = event.target.value;
        noCourse.classList.add('hidden');

        
    Array.from(courseItem).forEach(element => {
        if (inputUser.length >= 2) {
            let title = element.getElementsByTagName("h4")[0].textContent;
                if (title.toLowerCase().includes(inputUser.toLowerCase())) {
                    noCourse.classList.add('hidden');
                    element.classList.remove('hidden');
                    isFound = true;
                } else {
                    element.classList.add('hidden');
                    noCourse.classList.remove('hidden');
                }
        } else {
            element.classList.remove('hidden');
        }
    })
    if (isFound) {
        noCourse.classList.add('hidden');
    }
    });
}


getValue();