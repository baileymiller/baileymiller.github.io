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
  title: 'Path-Space Differentiable Rendering',
  authors: [
    'cheng-zhang',
    'bailey-miller',
    'kai-yan',
    'ioannis-gkioulekas',
    'shuang-zhuo',
  ],
  image: 'assets/paper-thumbnails/zhang20-thumb.png',
  paper: 'https://baileymiller-personal-page.s3.us-east-2.amazonaws.com/papers/singh17-paper.pdf',
}, {
  title: 'A null-scattering path integral formulation of light transport',
  authors: [
    'bailey-miller',
    'iliyan-georgiev',
    'wojciech-jarosz',
  ],
  joint: ['bailey-miller', 'iliyan-georgiev'],
  image: 'assets/paper-thumbnails/miller19-thumb.png',
  paper: 'https://baileymiller-personal-page.s3.us-east-2.amazonaws.com/papers/miller19-paper.pdf',
  publisher: 'https://dl.acm.org/doi/10.1145/3306346.3323025',
}, {
  title: 'Variance and convergence analysis of Monte Carlo line and segment sampling',
  authors: [
    'gurprit-singh',
    'bailey-miller',
    'wojciech-jarosz',
  ],
  image: 'assets/paper-thumbnails/singh17-thumb.png',
  paper: 'https://baileymiller-personal-page.s3.us-east-2.amazonaws.com/papers/zheng20-paper.pdf',
  publisher: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/cgf.13226',
}]

function getAuthors(pub) {
  let authorNames = ''
  const numAuthors = _.size(pub.authors)
  _.each(pub.authors, (id, index) => {
    if (id === ME) {
      authorNames += `<b>${PEOPLE[id].name}</b>`
    }
    else if (!_.isNil(PEOPLE[id].website)) {
      authorNames += `<a href="${PEOPLE[id].website}">${PEOPLE[id].name}</a>`
    }
    else {
      authorNames += PEOPLE[id].name
    }
    if (index < numAuthors - 1) {
      authorNames += ', '
    }
    if (index === numAuthors - 2) {
      authorNames += 'and '
    }
  })
  return `<span> ${authorNames} </span>`
}

function getProjectPage(pub) {
  if (!_.has(pub, 'projectPage')) return ''
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

function getCitation(pub) {
  if (!_.has(pub, 'citation')) return ''
  return `
    <div class="pr-3">
      <i class="fas fa-quote-left"></i>
      cite (bib)
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
          <div class="d-flex flex-row justify-content-start pt-2">
            ${getProjectPage(pub)}
            ${getPaper(pub)}
            ${getPublisherVersion(pub)}
            ${getCitation(pub)}
          </div>
        </div>
      </div>
    `
  const pubElement = document.createElement('div')
  pubElement.innerHTML = pubHTML
  PUBLICATIONS_LIST.append(pubElement)
})
