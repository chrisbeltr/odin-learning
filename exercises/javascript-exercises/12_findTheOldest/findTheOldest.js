const findTheOldest = function(people) {
    return people.reduce(function(oldest, person) {
        let personAge;
        if (!person.yearOfDeath) {
            let today = new Date();
            today = today.getFullYear();
            personAge = today - person.yearOfBirth;
        } else personAge = person.yearOfDeath - person.yearOfBirth;
        let oldestAge;
        if (!oldest.yearOfDeath) {
            let today = new Date();
            today = today.getFullYear();
            oldestAge = today - oldest.yearOfBirth;
        } else oldestAge = oldest.yearOfDeath - oldest.yearOfBirth;
        if (personAge > oldestAge) return person; else return oldest;
    }, people[0]);
};

// Do not edit below this line
module.exports = findTheOldest;
