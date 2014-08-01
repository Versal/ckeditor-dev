/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: wysiwygarea,removeformat,removeallformat */

bender.editor = {
	config: {
		autoParagraph: false,
		allowedContent: true
	}
};

bender.test(
{
	'test remove format always fire editor#selectionChange': function() {
		var ed = this.editor, bot = this.editorBot;
		bot.setHtmlWithSelection( '[<p style="text-align:right">foo</p>]' );
		ed.once( 'selectionChange', function() {
			assert.isTrue( true, '"selectionChange" event always fired after remove format.' );
		} );
		ed.execCommand( 'removeallformat' );
	},

	'test remove format always remove bold, italicize, underline': function() {
		var ed = this.editor, bot = this.editorBot;

		bender.editorBot.create( {
			name: 'test_editor3',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<p>[<strong>bold </strong><em>italicize </em><u>underline</u>]</p>' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>bold italicize underline</p>', bot.getData() );
		} );
	},

	'test remove format always remove strikethrough, superscript, subscript': function() {
		var ed = this.editor, bot = this.editorBot;

		bender.editorBot.create( {
			name: 'test_editor4',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<p>[<s>strikethrough </s><sup>superscript </sup><sub>subscript</sub>]</p>' );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>strikethrough superscript subscript</p>', bot.getData() );
		} );
	},

	'test remove format inside nested editable': function() {
		var editor = this.editor,
			bot = this.editorBot;

		bot.setHtmlWithSelection( '<p>foo</p><div contenteditable="false"><p contenteditable="true">[<b>foo</b> bar]</p></div>' );

		bot.editor.execCommand( 'removeallformat' );
		assert.areEqual( '<p>foo</p><div contenteditable="false"><p contenteditable="true">foo bar</p></div>', bot.getData() );

		var nestedE = editor.document.findOne( 'p[contenteditable=true]' ),
			sel = editor.getSelection();

		assert.areSame( nestedE, sel.getCommonAncestor(), 'Selection should not leak from nested editable' );
	},

	'test editor#addRemoveFormatFilter': function() {
		bender.editorBot.create( {
			name: 'test_editor2',
			config: { allowedContent: true }
		}, function( bot ) {
			bot.setHtmlWithSelection( '<ul><li>[<p><span style="color:red">foo</span> <ul><li>bar</li></ul>]</li></ul>' );

			bot.editor.addRemoveFormatFilter( function( element ) {
				return !element.is( 'b' ); // Don't remove 'b' elements.
			} );

			bot.editor.execCommand( 'removeallformat' );
			assert.areEqual( '<p>foo <b>bar</b></p>', bot.getData() );
		} );
	}

} );
