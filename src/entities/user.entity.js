class User {
  constructor(props = {}) {

    this.id = props.id;
    
    this.username = props.username;

    this.password = props.password;

    this.avatar = props.avatar;

    this.birth = props.birth;

    this.province = props.province;

    this.jobExp = props.jobExp;

    this.email = props.email;

    this.wx = props.wx;

    this.college = props.college;

    this.major = props.major;

    this.schoolYear = props.schoolYear;

    this.level = props.level;

    this.skills = props.skills;

    this.jobs = props.jobs;

  }
}

module.exports = User;