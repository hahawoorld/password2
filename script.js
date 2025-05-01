const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const excludeSimilarCheckbox = document.getElementById('excludeSimilar');
const excludeRepeatedCheckbox = document.getElementById('excludeRepeated');
const generateBtn = document.getElementById('generateBtn');
const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copyBtn');

function generatePassword() {
    const length = parseInt(lengthInput.value);
    let charset = '';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+=-`~[]{}\|:;"\'<>,.?/';
    const similarChars = 'l1O0';

    if (uppercaseCheckbox.checked) charset += uppercaseChars;
    if (lowercaseCheckbox.checked) charset += lowercaseChars;
    if (numbersCheckbox.checked) charset += numberChars;
    if (symbolsCheckbox.checked) charset += symbolChars;

    if (!charset) {
        passwordInput.value = '문자 종류를 선택해주세요.';
        return;
    }

    let password = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        let randomChar = charset[randomIndex];

        if (excludeSimilarCheckbox.checked && similarChars.includes(randomChar)) {
            i--;
            continue;
        }

        if (excludeRepeatedCheckbox.checked && password.includes(randomChar)) {
            // 간단한 연속/반복 문자 체크 (더 정교한 로직 필요할 수 있음)
            if (password.length > 0 && password[password.length - 1] === randomChar) {
                i--;
                continue;
            }
        }

        password += randomChar;
    }

    passwordInput.value = password;
}

function copyPassword() {
    if (passwordInput.value) {
        passwordInput.select();
        document.execCommand('copy');
        alert('비밀번호가 클립보드에 복사되었습니다.');
    } else {
        alert('생성된 비밀번호가 없습니다.');
    }
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);