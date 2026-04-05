#!/usr/bin/env node

const assert = require('assert');
const path = require('path');

const lexemeAnalysis = require(path.join(__dirname, '..', 'js', 'core', 'lexemeAnalysis.js'));

const empty = lexemeAnalysis.analyze('');
assert.strictEqual(empty.totalFindings, 0, 'Empty input should yield no findings');

const nounCase = lexemeAnalysis.analyze('Need benign pesticide framing.');
assert.strictEqual(nounCase.totalFindings, 1, 'Known -cide noun should be detected');
assert.strictEqual(nounCase.findings[0].family, 'destructive_suffix');
assert.strictEqual(nounCase.findings[0].semanticDomain, 'pest');
assert.strictEqual(nounCase.findings[0].primaryRewrite, 'pest management');

const adjectiveCase = lexemeAnalysis.analyze('Looking for non-cidal wording in this prompt.');
assert.strictEqual(adjectiveCase.totalFindings, 1, 'Standalone -cidal wording should be detected');
assert.strictEqual(adjectiveCase.findings[0].partOfSpeech, 'adjective');
assert.ok(
    adjectiveCase.findings[0].primaryRewrite.includes('mitigation'),
    'Standalone adjectival form should fall back to mitigation-oriented rewrite'
);

const aliasCase = lexemeAnalysis.analyze('A bactericidal workflow should sound less destructive.');
assert.strictEqual(aliasCase.totalFindings, 1, 'Alias-root adjectival case should be detected');
assert.strictEqual(aliasCase.findings[0].semanticDomain, 'bacterial');
assert.ok(
    aliasCase.findings[0].rewrites.some((rewrite) => rewrite.includes('bacterial management')),
    'Alias roots should resolve into domain-specific rewrites'
);

const neutralized = lexemeAnalysis.neutralizeText(
    'Pesticide and bactericidal wording should be softened.',
    lexemeAnalysis.analyze('Pesticide and bactericidal wording should be softened.')
);
assert.ok(neutralized.includes('Pest Management'), 'Neutralization should preserve leading capitalization');
assert.ok(neutralized.includes('bacterial management'), 'Neutralization should replace adjectival form');

console.log('Lexeme analysis tests passed');
