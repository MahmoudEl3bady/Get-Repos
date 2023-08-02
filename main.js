let getButton = document.querySelector('#getBtn');
let inputValue = document.querySelector('#input');
let reposData = document.querySelector('#show-Data');


getButton.onclick = function(){
  getRepos();
};


function getRepos(){
  fetch(`https://api.github.com/users/${inputValue.value}/repos`)
  .then((response) => response.json())
  .then((data) => {
    reposData.innerHTML = '';

    let dataTable = document.createElement('table');
    dataTable.className = 'table  table-hover table-bordered border bg-light table-striped mt-4 ms-4 text-center';

    let headerRow = document.createElement('tr');
    let headerName = document.createElement('th');
    headerName.innerText = 'Repository Name ';
    headerName.className = 'text-danger text-start p-3';
    let headerStars = document.createElement('th');
    headerStars.innerText = 'Stars';
    headerStars.className = 'text-danger';

    let headerWatchers = document.createElement('th');
    headerWatchers.innerText = 'Watchers';
    headerWatchers.className = 'text-danger';

   let headerLink =document.createElement('th');
   headerLink.innerText = "Repository Link";
   headerLink.className = 'text-danger';



    headerRow.appendChild(headerName);
    headerRow.appendChild(headerStars);
    headerRow.appendChild(headerWatchers);
    headerRow.appendChild(headerLink);
    dataTable.appendChild(headerRow);

    data.forEach((repo) => {
      console.log(repo);
      let row = document.createElement('tr');

      let repoNameCell = document.createElement('td');
      repoNameCell.innerText = repo.name;
      repoNameCell.className ='text-start p-3 fw-bold';
      let repoNameLink = document.createElement('td');
      repoNameLink.innerHTML=`<a href=https://github.com/${inputValue.value}/${repo.name} class="btn btn-info bg-info hover text-center bordered">Go to the repo</a>`
      // repoNameLink.innerText='GO to  the Repo';
      // repoNameLink.href = `https://github.com/${inputValue.value}/${repo.name}`;
      repoNameLink.setAttribute('target', '_blank');

      repoNameLink.className ='';

      let starsCell = document.createElement('td');
      starsCell.innerText = repo.stargazers_count;

      starsCell.className ='text-info-emphasis fs-5 fw-4 m-2';

      let watchersCell = document.createElement('td');
      watchersCell.innerText = repo.watchers_count;

      watchersCell.className ='text-info-emphasis fs-5  m-2';

      // console.log(repoNameCell);  
      row.appendChild(repoNameCell);    
      row.appendChild(starsCell);
      row.appendChild(watchersCell);
      row.appendChild(repoNameLink);
      dataTable.appendChild(row);
    });

    reposData.appendChild(dataTable);
  });
}
