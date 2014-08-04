/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: wysiwygarea,removeformat,removeallformat */

/* global bender, assert */
bender.editor = {
	config: {
		autoParagraph: false,
		allowedContent: true
	}
};

bender.test(
{
	'test removeallformat always fire editor#selectionChange': function() {
		var ed = this.editor, bot = this.editorBot;
		bot.setHtmlWithSelection( '[<p style="text-align:right">foo</p>]' );
		ed.once( 'selectionChange', function() {
			assert.isTrue( true, '"selectionChange" event always fired after remove format.' );
		} );
		ed.execCommand( 'removeallformat' );
	},

	'test removeallformat always remove bold, italicize, underline': function() {
		bender.editorBot.create( {
			name: 'test_editor1',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<p>[<strong>bold </strong><em>italicize </em><u>underline</u>]</p>' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>bold italicize underline</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove strikethrough, superscript, subscript': function() {
		bender.editorBot.create( {
			name: 'test_editor2',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<p>[<s>strikethrough </s><sup>superscript </sup><sub>subscript</sub>]</p>' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>strikethrough superscript subscript</p>', bot.getData() );
		} );
	},

	'test removeallformat works inside nested editable': function() {
		var editor = this.editor, bot = this.editorBot;

		bot.setHtmlWithSelection( '<p>foo</p><div contenteditable="false"><p contenteditable="true">[<b>foo</b> bar]</p></div>' );

		bot.editor.execCommand( 'removeallformat' );
		assert.areEqual( '<p>foo</p><div contenteditable="false"><p contenteditable="true">foo bar</p></div>', bot.getData() );
	},


	'test removeallformat always remove ul': function() {
		bender.editorBot.create( {
			name: 'test_editor3',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<ul><li>item one</li><li>item two</li></ul>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>item one<br />item two</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove li inside ul': function() {
		bender.editorBot.create( {
			name: 'test_editor4',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<ul><li>[item one]</li><li>item two</li></ul>' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>item one</p><ul><li>item two</li></ul>', bot.getData() );
		} );
	},

	'test removeallformat always remove ol': function() {
		bender.editorBot.create( {
			name: 'test_editor5',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<ol><li>item one</li><li>item two</li></ol>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>item one<br />item two</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove li inside ol': function() {
		bender.editorBot.create( {
			name: 'test_editor6',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<ol><li>[item one]</li><li>item two</li></ol>' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>item one</p><ol><li>item two</li></ol>', bot.getData() );
		} );
	},

	'test removeallformat always remove indentation': function() {
		bender.editorBot.create( {
			name: 'test_editor7',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<p style="margin-left: 40px;">this is a test</p>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>this is a test</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove blockquote': function() {
		bender.editorBot.create( {
			name: 'test_editor8',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<blockquote><p>this is a blockquote</p></blockquote>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>this is a blockquote</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove right-to-left text direction': function() {
		bender.editorBot.create( {
			name: 'test_editor9',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<p dir="rtl">this is right to left</p>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>this is right to left</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove link - inside link': function() {
		bender.editorBot.create( {
			name: 'test_editor10',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<p><a href="http://google.com">[Google]</a></p>' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>Google</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove link - outside link': function() {
		bender.editorBot.create( {
			name: 'test_editor11',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<p>This is [<a href="http://google.com">Google</a>]</p>' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>This is Google</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove sans-serif font': function() {
		bender.editorBot.create( {
			name: 'test_editor13',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<span style="font-family:avenirnext,avenir,sans-serif;">sans-serif font</span>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>sans-serif font</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove serif font': function() {
		bender.editorBot.create( {
			name: 'test_editor14',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<span style="font-family:georgia,serif;">serif font</span>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>serif font</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove style - special container': function() {
		bender.editorBot.create( {
			name: 'test_editor15',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<div style="background:#eee;border:1px solid #ccc;padding:5px 10px;">speical container</div>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>speical container</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove style - small': function() {
		bender.editorBot.create( {
			name: 'test_editor16',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<p><span style="font-size:12px;">small</span></p>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>small</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove style - normal': function() {
		bender.editorBot.create( {
			name: 'test_editor17',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<p><span style="font-size:16px;">normal</span></p>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>normal</p>', bot.getData() );
		} );
	},

	'test removeallformat always remove style - large': function() {
		bender.editorBot.create( {
			name: 'test_editor18',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '[<p><span style="font-size:24px;">large</span></p>]' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>large</p>', bot.getData() );
		} );
	},
} );
