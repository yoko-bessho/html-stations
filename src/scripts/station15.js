async function getData() {
  const userList = [
    { id: 1, first_name: '優', family_name: '大木', affiliation: 'TechTrain', is_student: false },
    { id: 2, first_name: '太郎', family_name: '山田', affiliation: 'HogeHoge大学', is_student: true }
  ];
  await wait(3000);
  return userList.map(buildFullName);

}

function buildFullName(person) {
    const full_name = `${person.family_name} ${person.first_name}`;
  
    return { full_name, ...person };
}


function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
