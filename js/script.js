// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);

// const { active } = require("browser-sync");

//   });
{
  'use strict';
    
  const titleClickHandler = function(event){
    const clickedElement = this;
    event.preventDefault();

    console.log('Link was clicked!');
    console.log('links:', event);
    

    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
    /*[DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement (with plus): ' + clickedElement);
        
    /*DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /*[DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
  
    /*[DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);  
  
    /*[DONE]add class 'active' to the correct article */
    targetArticle.classList.add('active');


  } ;
   
 

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.author-name';

  function generateTitleLinks(){

    /*[DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);

    
    function clearMessages(){
      titleList.innerHTML = '';
    }


    /*[DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    let html = '';

    for (let article of articles) {
      console.log(article);
  
      /*[DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);
 
      /*[DONE]find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);
      /*[DONE]get the title from the title element */
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      console.log(linkHTML);

      /*[DONE] create HTML of the link */
      titleList.innerHTML = titleList.innerHTML + linkHTML;

      /*[DONE] insert link into titleList */
      html = html + linkHTML;
    
    }
  
  }
  generateTitleLinks(); 
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
 
  function calculateTagsParams(tags) {
    const params = { max: 0, min: 999999 };

    for (let tag in tags){
      // console.log(tag + ' is user ' + tags[tag] + ' times ')

      params.max = Math.max(tags[tag],params.max);
      params.min = Math.min(tags[tag],params.min);
    }
    return params;
  }
  
  function calculateTagClass(caunt, params) {
    const normalizedCaunt = caunt - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCaunt / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) +1 );
    return optCloudClassCount + classNumber;
  }

  function generateTags(){
    // [NEW] create a new varible allTags with an empty object
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
  
    /* START LOOP: for every article: */
    for(let article of articles){
    
      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '' ;
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      // console.log(articleTags); 
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        // console.log(tag); 
        /* generate HTML of the link */
        // const taglinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        const tagLinkHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;
        /* add generated code to html variable */
        html = html + tagLinkHTML;
        // [NEW] check if this link is NOT already in allTags
        if(!allTags[tag]){
          
          // [NEW] add generated code to allTags object
          allTags[tag] = 1;
        } else{
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
      // console.log(titleList);
    /* END LOOP: for every article: */
    }
    //  [NEW] find list of tags in right column
    const tagList = document.querySelector(optTagsListSelector);
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    // console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      // const taglinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' ' + '</a></li>';
      // const tagLinkHTML = `<li><a class="${calculateTagClass(allTags[tag], tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
      const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag +  tag + '">' + tag + '</a></li>';
      // console.log('taglinkHTML:', tagLinkHTML);
      allTagsHTML += tagLinkHTML;
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
  generateTags(); 


  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
    console.log(tag);
    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(tagLinks);
    /* START LOOP: for each active tag link */
    for (let tagLink of tagLinks){
    /* remove class active */
      tagLink.classList.remove('active'); 
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    // const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    const tagLinksHref = document.querySelectorAll(`a[href="${href}"]`);
    /* START LOOP: for each found tag link */
    for (let tagLinkHref of tagLinksHref){
    /* add class active */
      tagLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    // generateTitleLinks('[data-tags~="' + tag + '"]');
    generateTitleLinks(`[data-tags~="${tag}"]`);
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let link of allLinksToTags){
    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthor() {
    // [NEW] create a new varible allTags with an empty object
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const titleList = article.querySelector(optArticleAuthorSelector);
      // console.log(titleList);
      /* make html variable with empty string */
      let html = '';
      // console.log(html);
      /* get tags from data-author attribute */
      const authorTags = article.getAttribute('data-author');
      // console.log(authorTags);
      /* generate HTML of the link */
      // const authorLinkHTML = '<a href="#author-' + authorTags'"><span>' + authorTags + '</span></a>;
      const authorLinkHTML = `<a href="#author-${authorTags}"><span>${authorTags}</span></a>`;
      // console.log(authorLinkHTML);
      /* add generated code to html variable */
      html = html + authorLinkHTML;
      // [NEW] check if this link is NOT already in allAuthors
      if(!allAuthors[authorTags]){
        // [NEW] add generated code to allAuthor object
        allAuthors[authorTags] = 1
      }else {
        allAuthors[authorTags]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
      // console.log(titleList)
    }
    // [NEW] find list of tags in right column
     const authorList = document.querySelector(optAuthorsListSelector);
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allAuthors);
    console.log('tagParams:', tagsParams);

    let allAuthorsHTML = '';

    for (let author in allAuthors){;
      const authorLinkHTML =  '<li><a href= "#author-' + author + '">' + author + ' (' + allAuthors[author] + ') </a></li> ';
      console.log('authorsLinkHTML:',authorLinkHTML);

      allAuthorsHTML += authorLinkHTML;
    } 
    authorList.innerHTML = allAuthorsHTML;
  }
  generateAuthor();
  
  function authorClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    // console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#author-','');
    /* find all tag links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for (let authorLink of authorLinks){
      /* remove class active */
      authorLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    // const authorLinkHref = document.querySelectorAll('a[href="' + href + '"]');
    const authorLinksHref = document.querySelectorAll(`a[href="${href}"]`);
    /* START LOOP: for each found tag link */
    for (let authorLinkHref of authorLinksHref){
      /* add class active */
      authorLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    // generateTitleLinks('[data-author="' + tag + '"]');
    generateTitleLinks(`[data-author="${tag}"]`);
    
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const allLinksToAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each link */
    for (let link of allLinksToAuthors){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();
}






















