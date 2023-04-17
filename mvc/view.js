export const View = (() => {
    const domstr = {
      container: "#todolist_container",
      completedtodolist_container: "#completedtodolist_container",
      pendingtodolist_container: "#pendingtodolist_container",
      // deletebtn: ".deletebtn",
      // completedbtn: ".completedbtn",
      // editbtn:'.editbtn',
      inputbox: ".todolist__input"
    };
    const render = (ele, tmp) => {
      ele.innerHTML = tmp;
    };

    const createCompletedTmp = (arr) => {
      let completedtmp = "";
  
      arr.forEach((ele) => {
        let isChecked = "";
        // console.log(ele)
        if (ele.completed) {
          isChecked = "checked";
          completedtmp += `        
            <li>
              
              <span id="${ele.id}" class="${isChecked}">${ele.title}</span>
              <button class="deletebtn">X</button>
              <button class="completedbtn"><-</button> 
            </li>
          `;
        }
  
        //
      });
      return completedtmp;
    };
  
    const createPendingTmp = (arr) => {
      let pendingtmp = "";
  
      arr.forEach((ele) => {
        let isChecked = "";
        // console.log(ele)
        if (!ele.completed) {
          pendingtmp += `        
            <li>
              <span id="${ele.id}" class="${isChecked}"> ${ele.title} </span>
              <button class="completedbtn">-></button> 
              <button class="deletebtn">X</button>
              <button class="editbtn">edit</button>
              
              
            </li>
          `;
        }
  
        //
      });
      return pendingtmp;
    };
  
    return {
      domstr,
      render,
      // createTmp,
      createCompletedTmp,
      createPendingTmp
    };
  })();