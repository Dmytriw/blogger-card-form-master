var forms = $('.form');
var dropdownOptionsChosen = 0;
var defaultDropdownPlaceholder = document.getElementById('dropdown__body').children[0].innerHTML;
var warningCl = 'form-part--warning';

function HeaderLoad() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'header.html', true);
    xhr.onreadystatechange= function() {
        if (this.readyState !== 4) {
            return;
        }
    
        if (this.status !== 200) {
            return;
        }
    
        document.getElementById('to-include').innerHTML= this.responseText;
    };
    
    xhr.send();
}

function FormControl_1() {
    let isBlogger = true;
    let commerceButtonHasBeenChosen = false;
    let commerceBtns = $('.form-part.worth > .row > .button');
    let bloggerBtn = $('#button--blogger');
    let commerceBtn = $('#button--commerce');
    
    let controlBtns = [$('#button__control--1'), $('#button__control--2')];
    let inputs = $('.input');
    let adMode = $('#ad-mode');
    let formParts = $('.form-part');

    Tooltip = () => {
        let tooltipBtns = $('.tooltip');

        $.map(tooltipBtns, (element) => {
            $(element).on('click', () => {
                $(element).parent().toggleClass('option-with-tooltip--active');
            });

            $(window).on('click', (e) => {
                if(!element.contains(e.target)) {
                    $(element).parent().removeClass('option-with-tooltip--active');
                }
            });
        });
    }

    CommerceButtons = () => {

        $.map(commerceBtns, (element) => {
            $(element).on('click', () => {
                if(commerceBtns.hasClass('button--active')) {
                    commerceBtns.removeClass('button--active');
                }

                $(element).addClass('button--active');

                if($(element).parent().parent().hasClass(warningCl)) {
                    $(element).parent().parent().removeClass(warningCl);
                }

                commerceButtonHasBeenChosen = true;
            });
        });
    }

    bloggerBtn.on('click', () => {
        
        isBlogger = true;

        if(!bloggerBtn.parent().parent().hasClass('ad-mode--chosen')) {
            bloggerBtn.parent().parent().addClass('ad-mode--chosen');
        }

        if(bloggerBtn.parent().parent().hasClass(warningCl)) {
            bloggerBtn.parent().parent().removeClass(warningCl);
        }

        $.map(forms, (element) => {
            if($(element).hasClass('form--commerce')) {
                $(element).removeClass('form--commerce');
            }
            if(!$(element).hasClass('form--blogger')) {
                $(element).addClass('form--blogger');
            }
        });

        for(var i = 0; i < controlBtns.length; i++) {
            if(controlBtns[i].hasClass('bottom-part__button--disabled')) {
                controlBtns[i].removeClass('bottom-part__button--disabled');
            }
        }
    });

    commerceBtn.on('click', () => {
        
        isBlogger = false;

        if(!commerceBtn.parent().parent().hasClass('ad-mode--chosen')) {
            commerceBtn.parent().parent().addClass('ad-mode--chosen');
        }

        if(commerceBtn.parent().parent().hasClass(warningCl)) {
            commerceBtn.parent().parent().removeClass(warningCl);
        }

        $.map(forms, (element) => {
            if($(element).hasClass('form--blogger')) {
                $(element).removeClass('form--blogger');
            }
            if(!$(element).hasClass('form--commerce')) {
                $(element).addClass('form--commerce');
            }
        });

        for(var i = 0; i < controlBtns.length; i++) {
            if(controlBtns[i].hasClass('bottom-part__button--disabled')) {
                controlBtns[i].removeClass('bottom-part__button--disabled');
            }
        }
    });
    
    Tooltip();
    
    CommerceButtons();

    controlBtns[0].on('click', () => {
        $.map(inputs, (element, i) => {
            if (i != 2) {
                $(element).val('');
            } else {
                $(element).val('ДД.ММ.ГГ.');
            }
        });
        
        $('.form').removeClass('form--commerce');
        $('.form').removeClass('form--blogger');

        $('.ad-mode').removeClass('ad-mode--chosen');

        $.map($('.option'), (element) => {
            if ($(element).hasClass('option--active')) {
                $(element).removeClass('option--active');
            }
        });

        $.map($('.button'), (element) => {
            if ($(element).hasClass('button--active')) {
                $(element).removeClass('button--active');
            }
        });

        controlBtns[0].addClass('bottom-part__button--disabled');
        controlBtns[1].addClass('bottom-part__button--disabled');
    });

    controlBtns[1].on('click', () => {
        $.map(inputs, (element, i) => {
            if(i != 3) {
                if($(element).val() == '' || $(element).val().includes('ДД')) {
                    $(element).parent().addClass('form-part--warning');
                }

                if(!/^[a-zA-Z0-9- ._@]*$/.test($(element).val())) {
                    $(element).parent().addClass('form-part--warning');
                    $(element).parent().addClass(warningCl + '-chars');
                }
            } else {
                if($(element).parent().find('.option').hasClass('option--active')) {
                    if($(element).parent().find('.option--active').hasClass('unlock')) {
                        if($(element).val() == '') {
                            $(element).parent().addClass('form-part--warning');    
                        }
                    } else {

                    }
                } else {
                    $(element).parent().addClass('form-part--warning');
                }
            }
        });

        if(!controlBtns[1].hasClass('bottom-part__button--disabled')) {
            if($(inputs[0]).val() != '' && /^[a-zA-Z0-9- ._@]*$/.test($(inputs[0]).val())) {
                if($(inputs[1]).val() != '' && /^[a-zA-Z0-9- ._@]*$/.test($(inputs[1]).val())) {
                    if(!$(inputs[2]).val().includes('ДД')) {
                        if(!$(inputs[3]).parent().hasClass(warningCl)) {
                            if($(inputs[4]).val() != '') {
                                if(isBlogger) {
                                    $(forms[0]).addClass('form--hidden');
                                    $(forms[1]).removeClass('form--hidden');

                                    $.map(formParts, (_element) => {
                                        if($(_element).hasClass(warningCl)) {
                                            $(_element).removeClass(warningCl);
                                        }
                                    });

                                    document.body.scrollTop = 0;
                                    document.documentElement.scrollTop = 0;                                    
                                } else {
                                    if(commerceButtonHasBeenChosen) {
                                        $(forms[0]).addClass('form--hidden');
                                        $(forms[1]).removeClass('form--hidden');
    
                                        $.map(formParts, (_element) => {
                                            if($(_element).hasClass(warningCl)) {
                                                $(_element).removeClass(warningCl);
                                            }
                                        });
    
                                        document.body.scrollTop = 0;
                                        document.documentElement.scrollTop = 0;
                                    } else {
                                        commerceBtns.parent().parent().addClass(warningCl);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            adMode.addClass(warningCl);
        }
    });

    $.map(inputs, (element) => {
        $(element).on('input', (e) => {
            if($(element).val() != '') {
                if(!/^[a-zA-Z0-9- ._@]*$/.test($(element).val())) {

                } else {

                    if($(element).parent().hasClass(warningCl)) {
                        $(element).parent().removeClass(warningCl);
                    }

                    if($(element).parent().hasClass(warningCl + '-chars')) {
                        $(element).parent().removeClass(warningCl + '-chars');
                    }
                }
            }
        });
    });
}

function DropdownHandler() {
    let dropdown = $('#dropdown');
    let dropdownBody = $('#dropdown__body');

    dropdown.on('click', () => {
        if(dropdown.hasClass('dropdown--open')) {
            dropdown.removeClass('dropdown--open');
        } else {
            dropdown.addClass('dropdown--open');
        }
    });

    $(window).on('click', (e) => {
        if (!dropdown.get(0).contains(e.target)){
            if(dropdown.hasClass('dropdown--open')) {
                dropdown.removeClass('dropdown--open');
            }
        }
    })
}

function FileUploading() {
    let realButtons = document.getElementsByClassName('files-load__real-load');
    let customButtons = document.getElementsByClassName('files-load__button');
    let customTextes = document.getElementsByClassName('files-status__title');

    let nofiles = document.getElementsByClassName('no-file-chosen');
    let removeButtons = document.getElementsByClassName('remove-file');

    for(var i = 0; i < customButtons.length; i++) {
        customButtons[i].addEventListener('click', function(i) {
            realButtons[i].click();
        }.bind(null, i));
    }

    for(var i = 0; i < realButtons.length; i++) {
        realButtons[i].addEventListener('change', function(i) {
            if(realButtons[i].parentElement.parentElement.classList.contains('form-part--warning')) {
                realButtons[i].parentElement.parentElement.classList.remove('form-part--warning');
            }
            
            customTextes[i].innerHTML = realButtons[i].value.substring(realButtons[i].value.lastIndexOf('\\') + 1);

            if(!realButtons[i].parentElement.classList.contains('files-load--file-loaded')) {
                realButtons[i].parentElement.classList.add('files-load--file-loaded');
            }

            if(customTextes[i].innerHTML.length > 17) {
                if(!customTextes[i].parentElement.classList.contains('files-status--rtl')) {
                    customTextes[i].parentElement.classList.add('files-status--rtl');
                }
            } else {
                if(customTextes[i].parentElement.classList.contains('files-status--rtl')) {
                    customTextes[i].parentElement.classList.remove('files-status--rtl');
                }
            }
        }.bind(null, i));
    }

    for(var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', function(i) {
            realButtons[i].value = "";
            customTextes[i].innerHTML = "";
            
            if(realButtons[i].parentElement.classList.contains('files-load--file-loaded')) {
                realButtons[i].parentElement.classList.remove('files-load--file-loaded');
            }
            
            if(customTextes[i].parentElement.classList.contains('files-status--rtl')) {
                customTextes[i].parentElement.classList.remove('files-status--rtl');
            }
        }.bind(null, i));
    }
}

function Checkboxes() {
    let checkboxes = document.getElementsByClassName('option');
    
    for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', function(i) {
            if(!checkboxes[i].classList.contains('option--active')) {
                if(checkboxes[i].id == 'necessary-checkbox') {
                    if(checkboxes[i].parentElement.classList.contains('form-part--warning')) {
                        checkboxes[i].parentElement.classList.remove('form-part--warning');
                    }
                }

                if(checkboxes[i].parentElement.parentElement.parentElement.classList.contains('form-part--warning')) {
                    checkboxes[i].parentElement.parentElement.parentElement.classList.remove('form-part--warning');
                }

                if(checkboxes[i].parentElement.parentElement.parentElement.parentElement.classList.contains('form-part--warning')) {
                    checkboxes[i].parentElement.parentElement.parentElement.parentElement.classList.remove('form-part--warning');
                }

                if(checkboxes[i].closest('.boxes')) {
                    if(!checkboxes[i].classList.contains('unlock')) {
                        document.querySelectorAll('.price .form-part .input')[0].classList.add('input--disabled');
                    }
                    for(var j = 0; j < checkboxes.length; j++) {
                        if(checkboxes[j].classList.contains('option--active')) {
                            checkboxes[j].classList.remove('option--active');
                        }
                    }

                    if(checkboxes[i].classList.contains('unlock')) {
                        document.querySelectorAll('.price .form-part .input')[0].classList.remove('input--disabled');
                    }
                }
                if(checkboxes[i].classList.contains('dropdown-option')) {
                    if(dropdownOptionsChosen < 3) {
                        checkboxes[i].classList.add('option--active');
                        
                        if(checkboxes[i].parentElement.parentElement.parentElement.classList.contains('form-part--warning')) {
                            checkboxes[i].parentElement.parentElement.parentElement.classList.remove('form-part--warning');
                        }
                        dropdownOptionsChosen += 1;

                        if(dropdownOptionsChosen > 0) {
                            checkboxes[i].parentElement.parentElement.children[0].children[0].innerHTML = checkboxes[i].parentElement.parentElement.children[0].children[0].innerHTML.replace(defaultDropdownPlaceholder, '');
                        }

                        if(dropdownOptionsChosen > 1) {
                            let temp = document.createElement('span');
                            temp.className = 'dropdown__added';
                            temp.append(checkboxes[i].children[1].innerHTML);
                            checkboxes[i].parentElement.parentElement.children[0].children[0].append(temp);
                        } else {
                            let temp = document.createElement('span');
                            temp.className = 'dropdown__added';
                            temp.append(checkboxes[i].children[1].innerHTML);
                            checkboxes[i].parentElement.parentElement.children[0].children[0].append(temp);
                        }
                    }
                } else {
                    checkboxes[i].classList.add('option--active');
                }
            } else {
                checkboxes[i].classList.remove('option--active');
   
                if(checkboxes[i].classList.contains('unlock')) {
                } else {
                    document.querySelectorAll('.price .form-part .input')[0].classList.remove('input--disabled');
                }

                if(checkboxes[i].classList.contains('dropdown-option')) {  
                    if(dropdownOptionsChosen > 1) {
                        for(var j = 0; j < document.getElementsByClassName('dropdown__added').length; j++) {
                            if(checkboxes[i].children[1].innerHTML == document.getElementsByClassName('dropdown__added')[j].innerHTML) {
                                document.getElementsByClassName('dropdown__added')[j].remove();
                            }
                        }
                    } else {
                        for(var j = 0; j < document.getElementsByClassName('dropdown__added').length; j++) {
                            if(checkboxes[i].children[1].innerHTML == document.getElementsByClassName('dropdown__added')[j].innerHTML) {
                                document.getElementsByClassName('dropdown__added')[j].remove();

                                let temp = document.createElement('span');
                                temp.className = 'dropdown__text';
                                temp.append(defaultDropdownPlaceholder);
                                checkboxes[i].parentElement.parentElement.children[0].children[0].append(temp);
                            }
                        }
                    }
                    dropdownOptionsChosen -= 1;
                }
            }
        }.bind(null, i));
    }
}

function FormControl_2() {
    let inputs = $('.form--2 .input');

    let toggleHasBeenTouched = false;
    let levelRange = document.getElementById('level');

    let anyButtonChosen = false;
    let buttons = document.getElementsByClassName('format-button');

    let necessaryOption = $('#necessary-checkbox');
    
    let controlBtns = $('.form--2 .bottom-part .button');
    
    levelRange.addEventListener('input', () => {
        toggleHasBeenTouched = true;
        document.getElementById('rating').innerHTML = levelRange.value;
        if(levelRange.parentElement.parentElement.classList.contains('form-part--warning')) {
            levelRange.parentElement.parentElement.classList.remove('form-part--warning');
        }
    });

    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(i) {
            for(var j = 0; j < buttons.length; j++) {
                if(buttons[j].classList.contains('button--active')) {
                    buttons[j].classList.remove('button--active');
                }
            }
            if(!buttons[i].classList.contains('button--active')) {
                buttons[i].classList.add('button--active');

                if(buttons[i].parentElement.parentElement.classList.contains('form-part--warning')) {
                    buttons[i].parentElement.parentElement.classList.remove('form-part--warning');
                }

                anyButtonChosen = true;
            }
        }.bind(null, i));
    }

    $(controlBtns[0]).on('click', () => {
        $(forms[1]).addClass('form--hidden');
        $(forms[0]).removeClass('form--hidden');
    });

    $(controlBtns[1]).on('click', () => {
        for(var i = 0; i < inputs.length; i++) {

            if(!necessaryOption.hasClass('option--active')) {
                if(!necessaryOption.parent().hasClass(warningCl)) {
                    necessaryOption.parent().addClass(warningCl);
                }
            }

            if($(forms[1]).hasClass('form--blogger')) {
                if(dropdownOptionsChosen <= 0) {
                    $('#dropdown').parent().addClass(warningCl);
                }
            }

            if($(inputs[i]).val() == '') {
                if($(inputs[i]).get(0).type != 'file') {
                    $(inputs[i]).parent().addClass(warningCl);
                } else {
                    $(inputs[i]).parent().parent().addClass(warningCl);
                }
            } else {
                if(necessaryOption.hasClass('option--active')) {
                    if(anyButtonChosen) {
                        if(toggleHasBeenTouched) {
                            if($(forms[1]).hasClass('form--blogger')) {
                                if(dropdownOptionsChosen > 0) {
                                    $(forms[1]).addClass('form--hidden');
                                    $(forms[2]).removeClass('form--hidden');
                                }
                            } else {
                                $(forms[1]).addClass('form--hidden');
                                $(forms[2]).removeClass('form--hidden');
                                break;
                            }
                        }
                    }
                }
            }

            if(!anyButtonChosen) {
                if(!$('#formats').hasClass(warningCl)) {
                    $('#formats').addClass(warningCl);
                }
            }

            if(!toggleHasBeenTouched) {
                if(!$('#rate').hasClass(warningCl)) {
                    $('#rate').addClass(warningCl);
                }
            }
        }
    });
}

function LeaveNewReview() {
    let newReviewButton = document.getElementById('another-one');
    newReviewButton.addEventListener('click', () => {
        window.open("index.html","_self");
    });
}

HeaderLoad();
Checkboxes();
FileUploading();
FormControl_1();
FormControl_2();
DropdownHandler();
LeaveNewReview();