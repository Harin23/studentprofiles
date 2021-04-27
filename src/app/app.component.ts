import { Component, OnInit } from '@angular/core';
import { GetdataService } from './getdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private dataService: GetdataService
  ) { }

  ngOnInit(){
    this.displayData()
  }

  displayData(){
    type Student = {
      firstName: string;
      lastName: string;
      email: string;
      company: string;
      grades: [];
      pic: string;
      skill: string;
      id: number;
    };
    this.dataService.getData().subscribe(
      res =>{ 
        console.log(res['students'])
        let list = document.getElementById("studentList")!;
        res[Object.keys(res)[0]].forEach((element: Student) => {
          var liTag = document.createElement("LI");
          liTag.classList.add("list-group-item", "bg-transparent");
          liTag.setAttribute("id", element.id.toString())

          var name = document.createElement("h1");
          name.innerText = element.firstName.toUpperCase() + " " + element.lastName.toUpperCase();
          name.setAttribute("dataset", element.pic)
          liTag.appendChild(name);

          var image = document.createElement("img");
          image.setAttribute("src", element.pic);
          image.classList.add("float-left", "border", "rounded-circle", "border-dark", "position-relative");
          liTag.appendChild(image);

          var gradeDetails = document.createElement("details");
          gradeDetails.classList.add("float-right");
          element.grades.forEach((grade: number, i)=>{
            gradeDetails.innerHTML += "Test "+i+": "+grade+"<br>";
          });
          liTag.appendChild(gradeDetails);

          var info = document.createElement("P");
          // info.classList.add("float-left")
          info.innerHTML = "Email: " + element.email +"<br>" + "Comapny: " + element.company + "<br>" + "Skill: " + element.skill
          +"<br>"+ "Average: " + (element.grades.reduce((total, val) =>{
            return total + parseFloat(val)
          }, 0)/element.grades.length);
          liTag.appendChild(info);

          let ul = document.createElement("ul")
          ul.setAttribute("id", "tags")
          // ul.classList.add("nobullets")
          liTag.appendChild(ul)

          var tagInput = document.createElement("input");
          tagInput.classList.add("border-0", "position-relative","fixed-bottom");
          tagInput.setAttribute("placeholder", "Add a tag")
          tagInput.setAttribute("id", element.id.toString())
          tagInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter"){
              this.addTag(e);
            }
          }, false)
          liTag.appendChild(tagInput);

          list.appendChild(liTag);
        });
      },
      err=>{console.log(err)}
    )
  }

  searchStudents(){
    let studentSearch = (<HTMLInputElement>document.getElementById("studentSearch")).value;
    if(studentSearch !== ""){
      studentSearch = studentSearch.toUpperCase();
      (<HTMLInputElement>document.getElementById("studentSearch")).value = studentSearch;
      let studentList = (<HTMLInputElement>document.getElementById("studentList")).getElementsByTagName("li")
      for(let i=0; i<studentList.length; i++){
        let student = studentList[i]
        if(student.firstChild?.textContent?.match(studentSearch) == null){
          student.style.display = "none";
        }else{
          student.style.display = "";
        }
      }
    }
  }

  addTag(e: KeyboardEvent){
    let element = <HTMLInputElement>(e.target);
    let studentList = (<HTMLInputElement>document.getElementById("studentList")).getElementsByTagName("li");
      for(let i=0; i<studentList.length; i++){
        let student = studentList[i];
        if(student.id == element.id){
          let tag = document.createElement("li");
          tag.classList.add("nobullets")
          tag.innerText = element.value.toUpperCase();
          element.value = "";
          student.childNodes[4].appendChild(tag)
          console.log(student)
        }
      }
  }

  searchTags(){
    let tagSearch = (<HTMLInputElement>document.getElementById("tagSearch")).value;
    if(tagSearch !== ""){
      tagSearch = tagSearch.toUpperCase();
      (<HTMLInputElement>document.getElementById("tagSearch")).value = tagSearch;
      let studentList = (<HTMLInputElement>document.getElementById("studentList")).getElementsByTagName("li")
      for(let i=0; i<studentList.length; i++){
      }
    }
  }

}
