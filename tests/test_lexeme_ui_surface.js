#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const promptcraftTemplate = fs.readFileSync(path.join(projectRoot, 'templates', 'promptcraft.html'), 'utf8');
const anticlassifierTemplate = fs.readFileSync(path.join(projectRoot, 'templates', 'anticlassifier.html'), 'utf8');
const promptcraftTool = fs.readFileSync(path.join(projectRoot, 'js', 'tools', 'PromptCraftTool.js'), 'utf8');
const anticlassifierTool = fs.readFileSync(path.join(projectRoot, 'js', 'tools', 'AntiClassifierTool.js'), 'utf8');
const indexTemplate = fs.readFileSync(path.join(projectRoot, 'index.template.html'), 'utf8');

assert.ok(promptcraftTemplate.includes('Latin-Root Analysis'), 'PromptCraft should expose the analysis card');
assert.ok(promptcraftTemplate.includes('pcNeutralizeInput'), 'PromptCraft should expose neutralization action');
assert.ok(anticlassifierTemplate.includes('Latin-Root Analysis'), 'Anti-Classifier should expose the analysis card');
assert.ok(anticlassifierTemplate.includes('acNeutralizeInput'), 'Anti-Classifier should expose neutralization action');
assert.ok(promptcraftTool.includes('pcGetLexemeAnalysis'), 'PromptCraft tool should bind shared analysis');
assert.ok(anticlassifierTool.includes('acGetLexemeAnalysis'), 'Anti-Classifier tool should bind shared analysis');
assert.ok(indexTemplate.includes('js/data/latinAffixPolicies.js'), 'Index template should load affix policy data');
assert.ok(indexTemplate.includes('js/core/lexemeAnalysis.js'), 'Index template should load shared lexeme analysis engine');

console.log('Lexeme UI surface tests passed');
