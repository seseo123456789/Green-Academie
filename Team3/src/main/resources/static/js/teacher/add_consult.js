document.querySelector("#currentDate").value = new Date().toISOString().substring(0, 10);


const class_select = document.querySelector("#class_select");

function change(){
    const class_num = class_select.options[class_select.selectedIndex].value;
    fetch('/consult/changeStuOption', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
           // 데이터명 : 데이터값
            'classNum' : class_num
        })
    })
    .then((response) => {
        if(!response.ok){
            alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
            return ;
        }
    
        //return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
        return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
        const stu_select = document.querySelector('#stu_select');
        let str = ``;
        stu_select.innerHTML = ``;
        for(let i of data){
            str+= `<option value="${i.memberId}">${i.memberName}</option>`
        }
        stu_select.insertAdjacentHTML("afterbegin",str)
        
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
}
change();