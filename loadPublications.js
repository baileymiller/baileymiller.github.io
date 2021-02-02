const PUBLICATIONS_LIST = $('#publications-list')
const ME = 'bailey-miller'
const PEOPLE = {
  'bailey-miller': {
    name: 'Bailey Miller',
    website: 'baileymiller.github.io',
  },
  'wojciech-jarosz': {
    name: 'Wojciech Jarosz',
    website: 'https://cs.dartmouth.edu/~wjarosz/',
  },
  'gurprit-singh': {
    name: 'Gurprit Singh',
    website: 'https://people.mpi-inf.mpg.de/~gsingh/',
  },
  'iliyan-georgiev': {
    name: 'Iliyan Georgiev',
    website: 'http://iliyan.com/'
  },
  'ioannis-gkioulekas': {
    name: 'Ioannis Gkioulekas',
    website: 'https://www.cs.cmu.edu/~igkioule/',
  },
  'shuang-zhuo': {
    name: 'Shuang Zhao',
    website: 'https://shuangz.com/',
  },
  'cheng-zhang': {
    name: 'Cheng Zhang',
    website: 'https://www.ics.uci.edu/~chengz20/',
  },
  'kai-yan': {
    name: 'Kai Yan',
    website: null,
  },
}

const PUBLICATIONS = [{
  image: 'assets/paper-thumbnails/zhang20-thumb.png',
  title: 'Path-Space Differentiable Rendering',
  authors: [
    'cheng-zhang',
    'bailey-miller',
    'kai-yan',
    'ioannis-gkioulekas',
    'shuang-zhuo',
  ],
  venue: 'ACM Transactions on Graphics (Proceedings of <b>SIGGRAPH</b>), 39(4), July 2020',
  project: 'https://shuangz.com/projects/psdr-sg20/',
  paper: 'https://baileymiller-personal-page.s3.us-east-2.amazonaws.com/papers/zhang20-paper.pdf',
  publisher: 'https://dl.acm.org/doi/abs/10.1145/3386569.3392383'
}, {
  image: 'assets/paper-thumbnails/miller19-thumb.png',
  title: 'A null-scattering path integral formulation of light transport',
  authors: [
    'bailey-miller',
    'iliyan-georgiev',
    'wojciech-jarosz',
  ],
  joint_authors: ['bailey-miller', 'iliyan-georgiev'],
  venue: 'ACM Transactions on Graphics (Proceedings of <b>SIGGRAPH</b>), 38(4), July 2019.',
  project: 'https://cs.dartmouth.edu/~wjarosz/publications/miller19null.html',
  paper: 'https://baileymiller-personal-page.s3.us-east-2.amazonaws.com/papers/miller19-paper.pdf',
  publisher: 'https://dl.acm.org/doi/10.1145/3306346.3323025',
}, {
  image: 'assets/paper-thumbnails/singh17-thumb.png',
  title: 'Variance and convergence analysis of Monte Carlo line and segment sampling',
  authors: [
    'gurprit-singh',
    'bailey-miller',
    'wojciech-jarosz',
  ],
  venue: 'Computer Graphics Forum (Proceedings of EGSR), 36(4), June 2017.',
  project: 'https://cs.dartmouth.edu/~wjarosz/publications/singh17variance.html',
  paper: 'https://baileymiller-personal-page.s3.us-east-2.amazonaws.com/papers/singh17-paper.pdf',
  publisher: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/cgf.13226',
}]

function getAuthors(pub) {
  let authorNames = ''
  const numAuthors = _.size(pub.authors)
  _.each(pub.authors, (id, index) => {
    let name = PEOPLE[id].name
    if (_.includes(_.get(pub, 'joint_authors', []), id)) {
      name += "*"
    }

    if (id === ME) {
      authorNames += `<b>${name}</b>`
    }
    else if (!_.isNil(PEOPLE[id].website)) {
      authorNames += `<a href="${PEOPLE[id].website}">${name}</a>`
    }
    else {
      authorNames += name
    }

    if (index < numAuthors - 1) {
      authorNames += ', '
    }
    if (index === numAuthors - 2) {
      authorNames += 'and '
    }
  })
  return `<div>${authorNames}</div>`
}

function getVenue(pub) {
  return `
  <div>
    <i>${pub.venue}</i>
  </div>
  `
}
function getProjectPage(pub) {
  if (!_.has(pub, 'project')) return ''
  return `
    <div class="pr-3">
      <i class="fas fa-globe"></i>
      <a href=${pub.project}>project page</a>
    </div>
  `
}

function getPaper(pub) {
  if (!_.has(pub, 'paper')) return ''
  return `
    <div class="pr-3">
      <i class="far fa-file-pdf"></i>
      <a href=${pub.paper}>paper</a>
    </div>
  `
}

function getPublisherVersion(pub) {
  if (!_.has(pub, 'publisher')) return ''
  return `
    <div class="pr-3">
      <i class="fas fa-book"></i>
      <a href=${pub.publisher}> publisher version </a>
    </div>
  `
}

_.each(PUBLICATIONS, pub => {
  const pubHTML =
    `
      <div class="d-flex flex-row pb-4">
        <img
          src=${pub.image}
          class="publication-thumbnail img-responsive img-thumbnail"
        />
        <div class="d-flex flex-column pl-4">
          <h5>${pub.title}</h5>
          ${getAuthors(pub)}
          ${getVenue(pub)}
          <div class="d-flex flex-row justify-content-start pt-2">
            ${getProjectPage(pub)}
            ${getPaper(pub)}
            ${getPublisherVersion(pub)}
          </div>
        </div>
      </div>
    `
  const pubElement = document.createElement('div')
  pubElement.innerHTML = pubHTML
  PUBLICATIONS_LIST.append(pubElement)
})
