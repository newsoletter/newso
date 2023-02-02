const axios = require("axios");
const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { getIsoDateToDate } = require("./getDate");

/*
ARCHIVE_URL에는 newsoletter 각 포스트 link있음
*/
const ARCHIVE_URL = "https://page.stibee.com/archives/137513/emails";

const getTemplate = (title, sentTime, id) => `---
layout: default
type: article
title: ${title}
sent_time: ${sentTime}
id: ${id}
custom_css:
  - styles
custom_js:
  - app
---
`;

async function getArchive() {
  const response = await axios.get(ARCHIVE_URL);
  const archive = response.data;
  return archive;
}

async function getHTML(url) {
  try {
    const response = await axios.get(url,{
    });
    const contentHTML = response.data;
    return contentHTML;
  } catch (error) {
    console.log(error);
    console.log('newso: 아티클을 가져오지 못했습니다.')
  }
}

async function getEmailArticleContent(url) {
  const contentHTML = await getHTML(url);
  const dom = new JSDOM(contentHTML);
  const content = dom.window.document.querySelector(".public-email").outerHTML;
  return content;
}

async function writeHTML(contentHTML, fileName) {
  return fs.promises.writeFile(
    path.resolve(__dirname + `/../_posts/${fileName}.html`),
    contentHTML
  );
}

async function saveArticleHTML(article) {
  const { permanentLink, id, subject, sentTime } = article;
  const date = getIsoDateToDate(sentTime);
  const articleContent = await getEmailArticleContent(permanentLink);
  const template = getTemplate(subject, date, id);
  return writeHTML(template + articleContent, `${date}-${id}`);
}

exports.saveAllArticle = async function saveAllArticle() {
  const archive = await getHTML(ARCHIVE_URL);
  try {
    await Promise.all(archive.map((article) => saveArticleHTML(article)));
  } catch (error) {
    console.error("newso: save article error");
  }
};

exports.saveRecentArticle = async function () {
  const archive = await getHTML(ARCHIVE_URL);
  const recentArticleInfo = archive[0];

  try {
    saveArticleHTML(recentArticleInfo);
  } catch (error) {
    console.error("newso: 아티클을 저장하지 못했습니다.");
  }
};
