/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
function interfaceSetupWebsiteMasterViewport(oParam)
{

	gsSetupName = 'Website';
	ns1blankspace.objectContext = -1;
	ns1blankspace.object = 40;
	ns1blankspace.objectContextData = undefined;
	
	var bShowHome = true;
	var bNew = false;
	
	if (oParam != undefined)
	{
		if (oParam.showHome != undefined) {bShowHome = oParam.showHome}
		if (oParam.showNew != undefined) {bNew = oParam.showNew}
		if (bNew) {interfaceSetupWebsiteNew()};
	}	
	
	if (bShowHome)
	{
		ns1blankspaceViewportDestination({
			newDestination: 'interfaceSetupWebsiteMasterViewport({showHome: true});',
			move: false
			})		
	}
	
	ns1blankspaceReset();		
			
	$('#divns1blankspaceViewportControlSet').button(
	{
		label: "Websites & Webapps"
	});
	
	$('#inputns1blankspaceViewportControlSearch').keyup(function(event)
	{
		if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
        ns1blankspace.timer.delayCurrent = setTimeout("interfaceSetupWebsiteSearch('inputns1blankspaceViewportControlSearch')", ns1blankspace.option.typingWait);
	});
	
	$('#spanns1blankspaceViewportControlSearch').click(function(event)
	{
		interfaceSetupWebsiteSearch('inputns1blankspaceViewportControlSearch');
	});
	
	$('#spanns1blankspaceViewportControlSearchOptions').click(function(event)
	{
		interfaceSetupWebsiteSearchOptions();
	});
	
	$('#spanns1blankspaceViewportControlNew').click(function(event)
	{
		interfaceSetupWebsiteNew();
	})
	
	$('#spanns1blankspaceViewportControlNewOptions').click(function(event)
	{
		interfaceSetupWebsiteNewOptions();
	});
	
	$('#spanns1blankspaceViewportControlAction').click(function(event)
	{
		interfaceSetupWebsiteSave();
	});
	
	$('#spanns1blankspaceViewportControlAction').button({disabled: true});
	
	$('#spanns1blankspaceViewportControlActionOptions').click(function(event)
	{
	
		var aHTML = [];
		var h = -1;
		
		aHTML[++h] = '<table id="tableinterfaceActionOptions" class="interfaceActionOptions">';
						
		aHTML[++h] = '<tr id="trinterfaceActionOptions" class="interfaceActionOptions">' +
						'<td id="tdinterfaceActionOptionsRemove" class="interfaceActionOptions">' +
						'Remove' +
						'</td>' +
						'</tr>';

		aHTML[++h] = '</table>';

		ns1blankspaceViewportActionShow(this, aHTML.join(''), "interfaceSetupWebsiteActionOptionsBind()");
	});
	
	$('#spanns1blankspaceViewportControlActionOptions').button({disabled: true});
		
	$('#spanns1blankspaceViewportControlSetup').click(function(event)
	{
		interfaceSetupWebsiteSetup();
	});
	
	$('#spanns1blankspaceViewportControlSetupOptions').click(function(event)
	{
		interfaceSetupWebsiteSetupOptions();
	});
	
	$('#spanns1blankspaceViewportControlHelp').click(function(event)
	{
		interfaceSetupWebsiteHelp();
	});
	
	$('#spanns1blankspaceViewportControlHelpOptions').click(function(event)
	{
		interfaceSetupWebsiteHelpOptions();
	});

	$('td.interfaceViewportMasterControlBrowse').click(function(event)
	{
		interfaceSetupWebsiteSearch(event.target.id, {source: ns1blankspace.data.searchSource.browse});
	});
	
	$('td.interfaceViewportMasterControlBrowseAll').click(function(event)
	{
		interfaceSetupWebsiteSearch(event.target.id, {source: ns1blankspace.data.searchSource.browse});
	});
	
	if (ns1blankspace.option.setFocus) {$('#inputns1blankspaceViewportControlSearch').focus()};
	
	if (bShowHome)
	{
		interfaceSetupWebsiteHomeShow();
	}	
	
}

function interfaceSetupWebsiteActionOptionsBind()
{
	$('#tdinterfaceActionOptionsRemove').click(function(event)
	{
		interfaceSetupWebsiteRemove();
	});
}

function interfaceSetupWebsiteHomeShow(oResponse)
{

	if (oResponse == undefined)
	{
		var aHTML = [];
		var h = -1;
					
		aHTML[++h] = '<table id="tableInterfaceMainSummary" class="interfaceMain">';
		aHTML[++h] = '<tr id="trInterfaceMainSummaryRow1" class="interfaceMainRow1">' +
					'<td id="tdInterfaceWebsiteHomeMostLikely" class="interfaceMainColumn1Large">' +
						ns1blankspace.xhtml.loading +
						'</td>' +
						'<td id="tdInterfaceMainSummaryColumn2Action" style="width:175px;">' +
						'</td>' +
						'</tr>';
		aHTML[++h] = '</table>';		
						
		$('#divInterfaceMain').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
		
		aHTML[++h] = '<table id="tableInterfaceMainColumn2" cellspacing=0>';
		
		aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryTask1" class="interfaceMainColumn2Action" style="width:175px;">' +
						'<a href="/site/1262/mydigitalspace_attachment_loader.zip"' +
						' id="aInterfaceMainSummaryAttachmentUploader">Download Windows File Attachment Uploader</a>' +
						'</td></tr>';	
										
		aHTML[++h] = '</td></tr></table>';					

		$('#tdInterfaceMainSummaryColumn2Action').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
					
		aHTML[++h] = '<table>';
		aHTML[++h] = '<tr>' +
						'<td id="ns1blankspaceViewportSetupWebsiteLarge" class="ns1blankspaceViewportImageLarge">' +
						'&nbsp;' + 
						'</td>' +
						'</tr>';
		aHTML[++h] = '</table>';		
		
		$('#divInterfaceViewportControl').html(aHTML.join(''));	
		
		$('#divns1blankspaceViewportControlOptions').hide(ns1blankspace.option.hideSpeedOptions);
		
		$.ajax(
		{
			type: 'GET',
			url: '/ondemand/setup/?method=SETUP_SITE_SEARCH&recent=1',
			dataType: 'json',
			success: interfaceSetupWebsiteHomeShow
		});
		
	}
	else
	{
		var aHTML = [];
		var h = -1;
	
		if (oResponse.data.rows.length == 0)
		{
			aHTML[++h] = '<table id="tableInterfaceWebsiteHomeMostLikely">';
			aHTML[++h] = '<tr class="trInterfaceWebsiteHomeMostLikelyNothing">';
			aHTML[++h] = '<td class="tdInterfaceWebsiteHomeMostLikelyNothing">Click New to create a website.</td>';
			aHTML[++h] = '</tr>';
			aHTML[++h] = '</table>';
		}
		else
		{
		
			aHTML[++h] = '<table id="tableInterfaceWebsiteHomeMostLikely">';
			
			$.each(oResponse.data.rows, function()
			{	
				aHTML[++h] = '<tr class="interfaceMainRow">';
				
				aHTML[++h] = '<td id="interfaceWebsiteHomeMostLikely_Title-' + this.id + 
										'" class="interfaceHomeMostLikely">' +
										this.title +
										'</td>';
				
				aHTML[++h] = '</tr>'
			});
			
			aHTML[++h] = '</tbody></table>';
		}
		
		$('#tdInterfaceWebsiteHomeMostLikely').html(aHTML.join(''));
	
		$('td.interfaceHomeMostLikely').click(function(event)
		{
			interfaceSetupWebsiteSearch(event.target.id, {source: 1});
		});
	}
}

function interfaceSetupWebsiteSearch(sXHTMLElementId, oParam)
{
	
	var aSearch = sXHTMLElementId.split('-');
	var sElementId = aSearch[0];
	var sSearchContext = aSearch[1];
	var iMinimumLength = 3;
	var iSource = ns1blankspace.data.searchSource.text;
	var sSearchText;
	var iMaximumColumns = 1;
	var iRows = 10;
	
	if (oParam != undefined)
	{
		if (oParam.source != undefined) {iSource = oParam.source}
		if (oParam.searchText != undefined) {sSearchText = oParam.searchText}
		if (oParam.rows != undefined) {iRows = oParam.rows}
		if (oParam.searchContext != undefined) {sSearchContext = oParam.searchContext}
		if (oParam.minimumLength != undefined) {iMinimumLength = oParam.minimumLength}
		if (oParam.maximumColumns != undefined) {iMaximumColumns = oParam.maximumColumns}
	}
		
	if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
	{
	
		$('#divInterfaceViewportControl').html(ns1blankspace.xhtml.loading);
		
		ns1blankspace.objectContext = sSearchContext;
		var sParam = 'method=SETUP_SITE_SEARCH&id=' + ns1blankspace.objectContext;
		
		$.ajax(
		{
			type: 'GET',
			url: '/ondemand/setup/?' + sParam,
			dataType: 'json',
			success: function(data) {interfaceSetupWebsiteShow(oParam, data)}
		});
	}
	else
	{
		
		if (sSearchText == undefined)
		{
			sSearchText = $('#inputns1blankspaceViewportControlSearch').val();
		}	
		
		if (iSource == ns1blankspace.data.searchSource.browse)
		{
			iMinimumLength = 1;
			iMaximumColumns = 4;
			sSearchText = aSearch[1];
			if (sSearchText == '#') {sSearchText = '[0-9]'}
			sElementId = 'tableInterfaceViewportMasterBrowse';
		}
		
		if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
		{
			
			ns1blankspaceOptionsSetPosition(sElementId);
			ns1blankspaceSearchStart(sElementId);
			
			var sParam = 'method=SETUP_SITE_SEARCH&quicksearch=' + sSearchText;

			$.ajax(
			{
				type: 'GET',
				url: '/ondemand/setup/?' + sParam,
				dataType: 'json',
				success: function(data) {interfaceSetupWebsiteSearchShow(oParam, data)}
			});
			
		}
	};	
}

function interfaceSetupWebsiteSearchShow(oParam, oResponse)
{

	var iColumn = 0;
	var aHTML = [];
	var h = -1;
	var	iMaximumColumns = 1;
	
	if (oResponse.data.rows.length == 0)
	{
		ns1blankspaceSearchStop();
		$('#divns1blankspaceViewportControlOptions').hide();
	}
	else
	{
		aHTML[++h] = '<table class="interfaceSearchMedium">';
		aHTML[++h] = '<tbody>'
			
		$.each(oResponse.data.rows, function()
		{	
			iColumn = iColumn + 1;
			
			if (iColumn == 1)
			{
				aHTML[++h] = '<tr class="interfaceSearch">';
			}
			
			aHTML[++h] = '<td class="interfaceSearch" id="title' +
							'-' + this.id + '">' +
							this.title + '</td>';
			
			if (iColumn == iMaximumColumns)
			{
				aHTML[++h] = '</tr>'
				iColumn = 0;
			}	
		});
    	
		aHTML[++h] = '</tbody></table>';

		$('#divns1blankspaceViewportControlOptions').html(aHTML.join(''));
		$('#divns1blankspaceViewportControlOptions').show(ns1blankspace.option.showSpeedOptions);
		ns1blankspaceSearchStop();
		
		$('td.interfaceSearch').click(function(event)
		{
			$('#divns1blankspaceViewportControlOptions').html('&nbsp;');
			$('#divns1blankspaceViewportControlOptions').hide(ns1blankspace.option.hideSpeedOptions)
			interfaceSetupWebsiteSearch(event.target.id, 1);
		});
	}	
			
}

function interfaceSetupWebsiteViewport()
{
	
	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<div id="divInterfaceViewportControlContext" class="interfaceViewportControlContext"></div>';
	
	aHTML[++h] = '<table id="tableInterfaceViewportControl" class="interfaceViewportControl">';
	
	if (ns1blankspace.objectContext == -1)
	{
		aHTML[++h] = '<tr id="trInterfaceViewportControlDetails" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlDetails" class="interfaceViewportControl interfaceViewportControlHighlight">Details</td>' +
						'</tr>';
	}
	else
	{
		aHTML[++h] = '<tr id="trInterfaceViewportControlSummary" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlSummary" class="interfaceViewportControl interfaceViewportControlHighlight">Summary</td>' +
						'</tr>';
						
		aHTML[++h] = '<tr id="trInterfaceViewportControlDetails" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlDetails" class="interfaceViewportControl">Details</td>' +
						'</tr>';
		
		aHTML[++h] = '<tr id="trInterfaceViewportControlLayout" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlLayout" class="interfaceViewportControl">Layout</td>' +
						'</tr>';
		
		aHTML[++h] = '<tr><td>&nbsp;</td></tr>';
			
		aHTML[++h] = '<tr id="trInterfaceViewportControl" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlAttachments" class="interfaceViewportControl">Attachments</td>' +
						'</tr>';
				
		aHTML[++h] = '<tr><td>&nbsp;</td></tr>';

		aHTML[++h] = '<tr id="trInterfaceViewportControl" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlPages" class="interfaceViewportControl">Pages</td>' +
						'</tr>';
						
		aHTML[++h] = '<tr id="trInterfaceViewportControl" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlForms" class="interfaceViewportControl">Forms</td>' +
						'</tr>';				
							
		aHTML[++h] = '<tr><td>&nbsp;</td></tr>';

		aHTML[++h] = '<tr id="trInterfaceViewportControl" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlAdvanced" class="interfaceViewportControl">Advanced</td>' +
						'</tr>';
		
		aHTML[++h] = '<tr id="trInterfaceViewportControl" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlScripts" class="interfaceViewportControl">Scripts</td>' +
						'</tr>';
				
		aHTML[++h] = '<tr id="trInterfaceViewportControl" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlURLs" class="interfaceViewportControl">URLs</td>' +
						'</tr>';
	}
	
	aHTML[++h] = '</table>';					
				
	$('#divInterfaceViewportControl').html(aHTML.join(''));
	
	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<div id="divInterfaceMainSummary" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainDetails" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainLayout" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainAttachments" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainAddAttachment" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainPages" class="divInterfaceViewportMain"></div>';	
	aHTML[++h] = '<div id="divInterfaceMainAdvanced" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainScripts" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainURLs" class="divInterfaceViewportMain"></div>';	
	aHTML[++h] = '<div id="divInterfaceMainWebapp" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainForms" class="divInterfaceViewportMain"></div>';		
		
	$('#divInterfaceMain').html(aHTML.join(''));
		
	$('#tdInterfaceViewportControlSummary').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainSummary");
		interfaceSetupWebsiteSummary();
	});
	
	$('#tdInterfaceViewportControlDetails').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainDetails");
		interfaceSetupWebsiteDetails();
	});
	
	$('#tdInterfaceViewportControlLayout').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainLayout");
		interfaceSetupWebsiteLayout();
	});
	
	$('#tdInterfaceViewportControlAttachments').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainAttachments", true);
		ns1blankspaceAttachments({xhtmlElementID: 'divInterfaceMainAttachments', label: 'Select the file attachment:', maxFiles: 1, helpNotes: 'If you upload a file with the same name as an existing attachment it will automatically be replaced.'});
	});
	
	$('#tdInterfaceViewportControlPages').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainPages");
		interfaceSetupWebsitePages({actions: {add: true}});
	});
	
	$('#tdInterfaceViewportControlForms').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainForms");
		interfaceSetupWebsiteForms({actions: {add: true}});
	});
	
	$('#tdInterfaceViewportControlAddAttachment').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainAddAttachment");
		interfaceSetupWebsiteAddAttachment();
	});
	
	$('#tdInterfaceViewportControlAdvanced').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainAdvanced");
		interfaceSetupWebsiteAdvanced();
	});
	
	$('#tdInterfaceViewportControlScripts').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainScripts");
		interfaceSetupWebsiteScripts();
	});
	
	$('#tdInterfaceViewportControlURLs').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainURLs");
		interfaceSetupWebsiteURLs();
	});
}

function interfaceSetupWebsiteShow(oParam, oResponse)
{

	$('#divns1blankspaceViewportControlOptions').hide(ns1blankspace.option.hideSpeedOptions);
	interfaceSetupWebsiteViewport();
	
	var aHTML = [];
	var h = -1;
	
	if (oResponse.data.rows.length == 0)
	{
		ns1blankspace.objectContextData = undefined;
		
		aHTML[++h] = '<table><tbody><tr><td valign="top">Sorry can\'t find website.</td></tr>';
		aHTML[++h] = '<tr>&nbsp;</tr></tbody></table>';
				
		$('#divInterfaceMain').html(aHTML.join(''));
	}
	else
	{
		ns1blankspace.objectContextData = oResponse.data.rows[0];
					
		aHTML[++h] = '<table id="tableInterfaceMainSummary" class="interfaceMain">';
		aHTML[++h] = '<tr id="trInterfaceMainSummaryRow1" class="interfaceMainRow1">' +
					'<td id="tdInterfaceMainSummaryColumn1" class="interfaceMainColumn1">' +
						'</td>' +
						'<td id="tdInterfaceMainSummaryColumn2" class="interfaceMainColumn2">' +
						'</td>' +
						'</tr>';
		aHTML[++h] = '</table>';					
		
		$('#divInterfaceMainSummary').html(aHTML.join(''));
		
		$('#divInterfaceViewportControlContext').html(ns1blankspace.objectContextData.title);
		$('#spanns1blankspaceViewportControlAction').button({disabled: false});
		$('#spanns1blankspaceViewportControlActionOptions').button({disabled: false});

		ns1blankspaceViewportDestination({
			newDestination: 'interfaceSetupWebsiteMasterViewport({showHome: false});interfaceSetupWebsiteSearch("-' + ns1blankspace.objectContext + '")',
			move: false
			})
		
		ns1blankspaceObjectViewportHistory({functionDefault: 'interfaceSetupWebsiteSummary()'})
	}	
}		
		
function interfaceSetupWebsiteSummary()
{
	var aHTML = [];
	var h = -1;
	
	if (ns1blankspace.objectContextData == undefined)
	{
		aHTML[++h] = '<table><tbody><tr><td valign="top">Sorry can\'t find website.</td></tr>';
		aHTML[++h] = '<tr>&nbsp;</tr></tbody></table>';
				
		$('#divInterfaceMain').html(aHTML.join(''));
	}
	else
	{
		aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMainColumn1">';
		
		aHTML[++h] = '<tr><td id="tdInterfaceMainSummarySiteID" class="interfaceMainSummary">Site ID</td></tr>' +
						'<tr><td id="tdInterfaceMainSummarySiteID" class="interfaceMainSummaryValue">' +
						ns1blankspace.objectContextData.id +
						'</td></tr>';
						
		aHTML[++h] = '<tr><td id="tdInterfaceMainSummarySiteStatus" class="interfaceMainSummary">Status</td></tr>' +
						'<tr><td id="tdInterfaceMainSummarySiteStatus" class="interfaceMainSummaryValue">' +
						ns1blankspace.objectContextData.statustext +
						'</td></tr>';
						
		aHTML[++h] = '<tr><td id="tdInterfaceMainSummarySiteAttachmentsURL" class="interfaceMainSummary">Attachments URL</td></tr>' +
						'<tr><td id="tdInterfaceMainSummarySiteAttachmentsURL" class="interfaceMainSummaryValue">' +
						'/site/' + ns1blankspace.objectContextData.id + '/' +
						'</td></tr>';		
						

		if (ns1blankspace.objectContextData.ondemandstatustext == '')
		{
			aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryAppStatus" class="interfaceMainSummary">App Status</td></tr>' +
						'<tr><td id="tdInterfaceMainSummaryAppStatus" class="interfaceMainSummaryValue">' +
						'Not Enabled (click Advanced to enable requests to the site)' +
						'</td></tr>';

		}
		else
		{
			aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryAppStatus" class="interfaceMainSummary">App Status</td></tr>' +
						'<tr><td id="tdInterfaceMainSummaryAppStatus" class="interfaceMainSummaryValue">' +
						ns1blankspace.objectContextData.ondemandstatustext +
						'</td></tr>';
		}			

		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainSummaryColumn1').html(aHTML.join(''));

		var aHTML = [];
		var h = -1;	
		
		aHTML[++h] = '<table id="tableInterfaceMainColumn2" class="interfaceMainColumn2" cellpadding=6>';
							
		aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryTask2" class="interfaceMainColumn2Actionx" style="width:175px;">' +
						'<a href="#" id="aInterfaceMainSummarySetupWebApp"><strong>Convert to a jQuery or jQuery mobile webapp.</strong></a>' +
						'</td></tr>';
					
		if (ns1blankspace.objectContextData.primaryurl != '')
		{
			aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryTask3" class="interfaceMainColumn2Actionx" style="width:175px;">' +
						'<a href="' + ns1blankspace.objectContextData.primaryurl + '" target="_blank">' + ns1blankspace.objectContextData.primaryurl + '</a>' +
						'</td></tr>';
		}		
					
		aHTML[++h] = '<tr class="interfaceMainColumn2Action" >' +						
						'<td tdInterfaceMainSummaryTask4" class="interfaceMainColumn2Actionx" style="font-size:0.75em;color:#404040;">' +
						'<br /><hr />' +
						'<br />Use the Attachments link to add your js scripts and the Scripts section to reference them and any other scripts you may require.' +
						'</td>' +
						'</tr>';			
					
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainSummaryColumn2').html(aHTML.join(''));
		
		$('#aInterfaceMainSummaryAddAttachment').click(function(event)
		{
 			ns1blankspaceMainViewportShow("#divInterfaceMainAddAttachment");
			interfaceSetupWebsiteAddAttachment();
		});
		
		$('#aInterfaceMainSummarySetupWebApp').click(function() 
		{
			ns1blankspaceMainViewportShow("#divInterfaceMainWebapp");
			interfaceSetupWebApp();
		});
	}	
}

function interfaceSetupWebsiteDetails()
{
	var aHTML = [];
	var h = -1;
	
	if ($('#divInterfaceMainDetails').attr('onDemandLoading') == '1')
	{
		$('#divInterfaceMainDetails').attr('onDemandLoading', '');
				
		aHTML[++h] = '<table id="tableInterfaceMainDetails" class="interfaceMainDetails">';
		aHTML[++h] = '<tr id="trInterfaceMainDetailsRow1" class="interfaceMain">' +
						'<td id="tdInterfaceMainDetailsColumn1" class="interfaceMainColumn1">' +
						'</td>' +
						'<td id="tdInterfaceMainDetailsColumn2" class="interfaceMainColumn2">' +
						'</td>' +
						'</tr>';
		aHTML[++h] = '</table>';					
		
		$('#divInterfaceMainDetails').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
	
		aHTML[++h] = '<table id="tableInterfaceMainDetailsColumn1" class="interfaceMain">';
	
		aHTML[++h] = '<tr id="trInterfaceMainDetailsTitle" class="interfaceMain">' +
						'<td id="tdInterfaceMainDetailsTitle" class="interfaceMain">' +
						'Title' +
						'</td></tr>' +
						'<tr id="trInterfaceMainDetailsTitleValue" class="interfaceMainText">' +
						'<td id="tdInterfaceMainDetailsTitleValue" class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsTitle" class="inputInterfaceMainText">' +
						'</td></tr>';
		
		aHTML[++h] = '<tr id="trInterfaceMainDetailsEmail" class="interfaceMain">' +
						'<td id="tdInterfaceMainDetailsEmail" class="interfaceMain">' +
						'Email' +
						'</td></tr>' +
						'<tr id="trInterfaceMainDetailsEmailValue" class="interfaceMainText">' +
						'<td id="tdInterfaceMainDetailsEmailValue" class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsEmail" class="inputInterfaceMainText">' +
						'</td></tr>';
		
		
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainDetailsColumn1').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
			
		aHTML[++h] = '<table id="tableInterfaceMainDetailsColumn2" class="interfaceMain">';
	
		aHTML[++h] = '<tr id="trInterfaceMainDetailsSharing" class="interfaceMain">' +
						'<td id="tdInterfaceMainDetailsSharing" class="interfaceMain">' +
						'Status' +
						'</td></tr>' +
						'<tr id="trInterfaceMainDetailsSharing" class="interfaceMainText">' +
						'<td id="tdInterfaceMainDetailsSharingValue" class="interfaceMainRadio">' +
						'<input type="radio" id="radioStatus2" name="radioStatus" value="2"/>Open' +
						'<br /><input type="radio" id="radioStatus1" name="radioStatus" value="1"/>Closed' +
						'</td></tr>';
		
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainDetailsColumn2').html(aHTML.join(''));
		
		if (ns1blankspace.objectContextData != undefined)
		{
			$('#inputInterfaceMainDetailsTitle').val(ns1blankspace.objectContextData.title);
			$('#inputInterfaceMainDetailsEmail').val(ns1blankspace.objectContextData.email);
			$('[name="radioStatus"][value="' + ns1blankspace.objectContextData.status + '"]').attr('checked', true);
		}
		else
		{
			$('[name="radioStatus"][value="2"]').attr('checked', true);	
		}
	}	
}

function interfaceSetupWebsiteLayout()
{
	var aHTML = [];
	var h = -1;
	
	if ($('#divInterfaceMainLayout').attr('onDemandLoading') == '1')
	{
		$('#divInterfaceMainLayout').attr('onDemandLoading', '');
				
		aHTML[++h] = '<table id="tableInterfaceMainLayout" class="interfaceMainDetails">';
		aHTML[++h] = '<tr id="trInterfaceMainLayoutRow1" class="interfaceMain">' +
						'<td id="tdInterfaceMainLayoutColumn1" class="interfaceMainColumn1">' +
						'</td>' +
						'<td id="tdInterfaceMainLayoutColumn2" class="interfaceMainColumn2">' +
						'</td>' +
						'</tr>';
		aHTML[++h] = '</table>';					
		
		$('#divInterfaceMainLayout').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
	
		aHTML[++h] = '<table id="tableInterfaceMainLayoutColumn1" class="interfaceMain">';
	
		aHTML[++h] = '<tr id="trInterfaceMainLayout" class="interfaceMain">' +
						'<td id="tdInterfaceMainLayout" class="interfaceMain">' +
						'Layout' +
						'</td></tr>' +
						'<tr id="trInterfaceMainLayout" class="interfaceMainText">' +
						'<td id="tdInterfaceMainLayoutValue" class="interfaceMainRadio">' +
						'<input type="radio" id="radioLayout3" name="radioLayout" value="3"/>None (Use CSS/Divs)' +
						'<br /><input type="radio" id="radioLayout1" name="radioLayout" value="1"/>Using Tables' +
						'<br /><input type="radio" id="radioLayout2" name="radioLayout" value="2"/>Using Frames' +
						'<br /><br /></td></tr>';				
			
		aHTML[++h] = '<tr id="trInterfaceMainDetailsCSSAttachment" class="interfaceMain">' +
						'<td id="tdInterfaceMainDetailsCSSAttachment" class="interfaceMain">' +
						'CSS Attachment' +
						'</td></tr>' +
						'<tr id="trInterfaceMainDetailsCSSAttachment" class="interfaceMainText">' +
						'<td id="tdInterfaceMainDetailsCSSAttachmentValue" class="interfaceMainRadio">' +
						'<input type="radio" id="radioCSSAttachment-1" name="radioCSSAttachment" value="-1"/>' +
									'None<br />'
		
		var oSearch = new AdvancedSearch();
		oSearch.method = 'CORE_ATTACHMENT_SEARCH';
		
		oSearch.addField('filename,attachment');
		oSearch.addFilter('filename', 'TEXT_IS_LIKE', 'css')
		oSearch.addFilter('object', 'EQUAL_TO', 40);
		oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext)
		oSearch.async = false;
		oSearch.rf = 'json';
		oSearch.sort('filename', 'asc');
		
		oSearch.getResults(function(oResponse)
		{
			$.each(oResponse.data.rows, function()
			{
				aHTML[++h] = '<input type="radio" id="radioCSSAttachment' + this.attachment + '" name="radioCSSAttachment" value="' + this.attachment + '"/>' +
									this.filename + '<br />';				
			});
		});
		
		aHTML[++h] = '</td></tr>';				
						
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainLayoutColumn1').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
			
		aHTML[++h] = '<table id="tableInterfaceMainlayoutColumn2" class="interfaceMain">';

			aHTML[++h] = '<tr id="trInterfaceMainLayoutHeaderHeight" class="interfaceMain">' +
						'<td id="tdInterfaceMainLayoutHeaderHeight" class="interfaceMain">' +
						'Header Height' +
						'</td></tr>' +
						'<tr id="trInterfaceMainLayoutHeaderHeightValue" class="interfaceMainText">' +
						'<td id="tdInterfaceMainLayoutHeaderHeightValue" class="interfaceMainText">' +
						'<input id="inputInterfaceMainLayoutHeaderHeight" class="inputInterfaceMainText">' +
						'</td></tr>';
	
		aHTML[++h] = '<tr id="trInterfaceMainLayoutFooterHeight" class="interfaceMain">' +
						'<td id="tdInterfaceMainLayoutFooterHeight" class="interfaceMain">' +
						'Footer Height' +
						'</td></tr>' +
						'<tr id="trInterfaceMainLayoutFooterHeightValue" class="interfaceMainText">' +
						'<td id="tdInterfaceMainLayoutFooterHeightValue" class="interfaceMainText">' +
						'<input id="inputInterfaceMainLayoutFooterHeight" class="inputInterfaceMainText">' +
						'</td></tr>';
	
		aHTML[++h] = '<tr id="trInterfaceMainLayoutColumns" class="interfaceMain">' +
						'<td id="tdInterfaceMainLayoutColumns" class="interfaceMain">' +
						'Columns' +
						'</td></tr>' +
						'<tr id="trInterfaceMainLayoutColumnsValue" class="interfaceMainText">' +
						'<td id="tdInterfaceMainLayoutColumnsValue" class="interfaceMainText">' +
						'<input id="inputInterfaceMainLayoutColumns" class="inputInterfaceMainText">' +
						'</td></tr>';
		
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainLayoutColumn2').html(aHTML.join(''));
		
		if (ns1blankspace.objectContextData != undefined)
		{
			$('#inputInterfaceMainLayoutHeaderHeight').val(ns1blankspace.objectContextData.headerheight);
			$('#inputInterfaceMainLayoutFooterHeight').val(ns1blankspace.objectContextData.footerheight);
			$('#inputInterfaceMainLayoutColumns').val(ns1blankspace.objectContextData.columns);
			$('[name="radioLayout"][value="' + ns1blankspace.objectContextData.layout + '"]').attr('checked', true);
			$('[name="radioCSSAttachment"][value="' + ns1blankspace.objectContextData.cssattachment + '"]').attr('checked', true);
		}
		else
		{
			$('[name="radioLayout"][value="3"]').attr('checked', true);
			$('[name="radioCSSAttachment"][value="-1"]').attr('checked', true);
		}
	
	}	
}

function interfaceSetupWebsiteAdvanced()
{
	var aHTML = [];
	var h = -1;
	
	if ($('#divInterfaceMainAdvanced').attr('onDemandLoading') == '1')
	{
		$('#divInterfaceMainAdvanced').attr('onDemandLoading', '');
				
		aHTML[++h] = '<table id="tableInterfaceMainAdvanced" class="interfaceMainDetails">';
		aHTML[++h] = '<tr id="trInterfaceMainAdvancedRow1" class="interfaceMain">' +
						'<td id="tdInterfaceMainAdvancedColumn1" class="interfaceMainColumn1Large">' +
						'</td>' +
						'</tr>';
		aHTML[++h] = '</table>';					
		
		$('#divInterfaceMainAdvanced').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
	
		aHTML[++h] = '<table id="tableInterfaceMainAdvancedColumn1" class="interfaceMain">';
	
		aHTML[++h] = '<tr id="trInterfaceMainAdvancedOnDemand" class="interfaceMain">' +
						'<td id="tdInterfaceMainAdvancedOnDemand" class="interfaceMain">' +
						'App Status' +
						'</td></tr>' +
						'<tr id="trInterfaceMainAdvancedOnDemandValue" class="interfaceMainSelect">' +
						'<td id="tdInterfaceMainAdvancedOnDemandValue" class="interfaceMainRadio">' +
						'<input type="radio" id="radioOnDemand1" name="radioOnDemand" value="1"/>Disabled' +
						'<br /><input type="radio" id="radioOnDemand2" name="radioOnDemand" value="2"/>' +
								'Enabled For Testing (Allow requests from any source/site)' +
								'<br /><input type="radio" id="radioOnDemand3" name="radioOnDemand" value="3"/>' +
								'Enabled (Requests only from same site)' +
								'<br /><input type="radio" id="radioOnDemand4" name="radioOnDemand" value="4"/>' +
								'Enabled For Testing (Allow Requests from any source/site & access to any space)' +
								'<br /><input type="radio" id="radioOnDemand5" name="radioOnDemand" value="5"/>' +
								'Enabled (Requests only from same site & access to any space)' +
						'</td></tr>';
						
		aHTML[++h] = '<tr id="trInterfaceMainAdvanced" class="interfaceMain">' +
						'<td id="tdInterfaceMainAdvanced" class="interfaceMain">' +
						'Web Page Title' +
						'</td></tr>' +
						'<tr id="trInterfaceMainAdvanced" class="interfaceMainText">' +
						'<td id="tdInterfaceMainAdvancedValue" class="interfaceMainRadio">' +
						'<input type="radio" id="radioTitleN" name="radioTitle" value="N"/>Use Document Title' +
						'<br /><input type="radio" id="radioTitleY" name="radioTitle" value="Y"/>Use Document Keywords' +
						'</td></tr>';
	
		aHTML[++h] = '<tr id="trInterfaceMainAdvancedDocumentType" class="interfaceMain">' +
						'<td id="tdInterfaceMainAdvancedDocumentType" class="interfaceMain">' +
						'Document Type' +
						'</td></tr>' +
						'<tr id="trInterfaceMainAdvancedDocumentTypeValue" class="interfaceMainTextMulti">' +
						'<td id="tdInterfaceMainAdvancedDocumentTypeValue" class="interfaceMainTextMulti">' +
						'<textarea style="height: 50px;" rows="3" cols="35" id="inputInterfaceMainAdvancedDocumentType" class="inputInterfaceMainTextMultiLarge"></textarea>' +
						'</td></tr>';
		
		aHTML[++h] = '<tr id="trInterfaceMainAdvancedBodyTag" class="interfaceMain">' +
						'<td id="tdInterfaceMainAdvancedBodyTag" class="interfaceMain">' +
						'BODY Tag' +
						'</td></tr>' +
						'<tr id="trInterfaceMainAdvancedBodyTagValue" class="interfaceMainTextMulti">' +
						'<td id="tdInterfaceMainAdvancedBodyTagValue" class="interfaceMainTextMulti">' +
						'<textarea style="height: 50px;" rows="3" cols="35" id="inputInterfaceMainBodyTag" class="inputInterfaceMainTextMultiLarge"></textarea>' +
						'</td></tr>';
	
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainAdvancedColumn1').html(aHTML.join(''));
		
		if (ns1blankspace.objectContextData != undefined)
		{
			$('[name="radioOnDemand"][value="' + ns1blankspace.objectContextData.ondemandstatus + '"]').attr('checked', true);
			$('[name="radioTitle"][value="' + ns1blankspace.objectContextData.usekeywordsastitle + '"]').attr('checked', true);
			$('[name="radioTitle"][value="' +ns1blankspace.objectContextData.layout + '"]').attr('checked', true);
			$('#inputInterfaceMainAdvancedDocumentType').val(ns1blankspaceFormatXHTML(ns1blankspace.objectContextData.documenttype));
			$('#inputInterfaceMainBodyTag').val(ns1blankspaceFormatXHTML(ns1blankspace.objectContextData.bodytag));
		}
		
	}	
}

function interfaceSetupWebsiteScripts()
{
	var aHTML = [];
	var h = -1;
	
	if ($('#divInterfaceMainScripts').attr('onDemandLoading') == '1')
	{
		$('#divInterfaceMainScripts').attr('onDemandLoading', '');
	
		aHTML[++h] = '<table id="tableInterfaceMainScriptsColumn1" class="interfaceMain">';
		
		aHTML[++h] = '<tr id="trInterfaceMainScriptHeader" class="interfaceMain">' +
						'<td id="tdInterfaceMainScriptHeader" class="interfaceMain">' +
						'Header Script' +
						'</td></tr>' +
						'<tr id="trInterfaceMainScriptHeader" class="interfaceMain">' +
						'<td id="tdInterfaceMainScriptHeaderValue" class="interfaceMainTextMulti">' +
						'<textarea style="height: 350px;" rows="20" cols="80" id="inputInterfaceMainScriptHeader" class="inputInterfaceMainTextMultiLarge"></textarea>' +
						'</td></tr>';
		
		aHTML[++h] = '<tr id="trInterfaceMainScriptFooter" class="interfaceMain">' +
						'<td id="tdInterfaceMainScriptFooter" class="interfaceMain">' +
						'Footer Script (eg Google Analytics)' +
						'</td></tr>' +
						'<tr id="trInterfaceMainScriptFooter" class="interfaceMain">' +
						'<td id="tdInterfaceMainScriptFooterValue" class="interfaceMainTextMulti">' +
						'<textarea style="height: 150px;" rows="20" cols="80" id="inputInterfaceMainScriptsFooter" class="inputInterfaceMainTextMultiLarge"></textarea>' +
						'</td></tr>';
						
		aHTML[++h] = '</table>';					
		
		$('#divInterfaceMainScripts').html(aHTML.join(''));
		
		if (ns1blankspace.objectContextData != undefined)
		{
			$('#inputInterfaceMainScriptHeader').val(ns1blankspaceFormatXHTML(ns1blankspace.objectContextData.headerscript));
			$('#inputInterfaceMainScriptFooter').val(ns1blankspaceFormatXHTML(ns1blankspace.objectContextData.footerscript));
		}
	}	
}

function interfaceSetupWebsitePages(oParam, oResponse)
{
	var iObjectContext = ns1blankspace.objectContext;
	var sXHTMLElementId = 'divInterfaceMainPages';
	var oOptions = {view: true, remove: true};
	var oActions = {add: true};
	
	if (oParam != undefined)
	{
		if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
		if (oParam.xhtmlElementId != undefined) {sXHTMLElementId = oParam.xhtmlElementId}
		if (oParam.options != undefined) {oOptions = oParam.options}
		if (oParam.actions != undefined) {oActions = oParam.actions}
	}		
		
	if (oResponse == undefined)
	{
		var sParam = 'method=SETUP_SITE_DOCUMENT_SEARCH&site=' + iObjectContext;
		
		$.ajax(
		{
			type: 'GET',
			url: '/ondemand/setup/?' + sParam,
			dataType: 'json',
			success: function(data) {interfaceSetupWebsitePages(oParam, data)}
		});

	}
	else
	{
		if (oActions != undefined)
		{
			var aHTML = [];
			var h = -1;	
						
			aHTML[++h] = '<table id="tableInterfaceMainPages" class="interfaceMain">' +
						'<tr id="trInterfaceMainPagesRow1" class="interfaceMainRow1">' +
						'<td id="tdInterfaceMainPagesColumn1" class="interfaceMainColumn1Large">' +
						ns1blankspace.xhtml.loading +
						'</td>' +
						'<td id="tdInterfaceMainPagesColumn2" class="interfaceMainColumn2Action">' +
						'</td>' +
						'</tr>' +
						'</table>';					
				
			$('#' + sXHTMLElementId).html(aHTML.join(''));
			sXHTMLElementId = 'tdInterfaceMainPagesColumn1';
			
			var aHTML = [];
			var h = -1;	
			
			aHTML[++h] = '<table id="tableInterfaceMainPagesColumn2" class="interfaceMainColumn2">';
			
			if (oActions.add)
			{
				aHTML[++h] = '<tr><td id="tdInterfaceMainPagesAdd" class="interfaceMainAction">' +
							'<span id="spanInterfaceMainPagesAdd">Add</span>' +
							'</td></tr>';
			}
			
			aHTML[++h] = '</table>';					
			
			$('#tdInterfaceMainPagesColumn2').html(aHTML.join(''));
		
			$('#spanInterfaceMainPagesAdd').button(
			{
				label: "Add"
			})
			.click(function() {
				 ns1blankspaceWebsitePagesAdd(oParam);
			})
			
		}	
	
		var aHTML = [];
		var h = -1;
		
		if (oResponse.data.rows.length == 0)
		{
			aHTML[++h] = '<table id="tableWebsitePages" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
			aHTML[++h] = '<tbody>'
			aHTML[++h] = '<tr class="interfaceMainCaption">' +
							'<td class="interfaceMainRowNothing">No pages.</td></tr>';
			aHTML[++h] = '</tbody></table>';

			$('#' + sXHTMLElementId).html(aHTML.join(''));
		
		}
		else
		{
			aHTML[++h] = '<table id="tableClientAudits" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
			aHTML[++h] = '<tbody>'
			aHTML[++h] = '<tr class="interfaceMainCaption">';
			aHTML[++h] = '<td class="interfaceMainCaption">Title</td>';
			aHTML[++h] = '<td class="interfaceMainCaption">URL</td>';
			aHTML[++h] = '<td class="interfaceMainCaption">Type</td>';
			aHTML[++h] = '<td class="interfaceMainCaption">Sharing</td>';
			aHTML[++h] = '<td class="interfaceMainCaption">&nbsp;</td>';
			aHTML[++h] = '</tr>';
			
			$.each(oResponse.data.rows, function()
			{	
				aHTML[++h] = '<tr class="interfaceMainRow">';
								
				aHTML[++h] = '<td id="tdWebsitePages_title-' + this.id + '" class="interfaceMainRow">' +
										this.documenttitle + '</td>';
										
				aHTML[++h] = '<td id="tdWebsitePages_url-' + this.id + '" class="interfaceMainRow">' +
										this.documenturl + '</td>';
										
				if (this.locationtext == 'Header' || this.locationtext == 'Home')
				{				
					aHTML[++h] = '<td id="tdWebsitePages_location-' + this.id + '" class="interfaceMainRow">' +
										this.locationtext + '</td>';
				}
				else
				{
					aHTML[++h] = '<td id="tdWebsitePages_location-' + this.id + '" class="interfaceMainRow" style="color:#A0A0A0;">' +
										'Page</td>';
				}						
				
				if (this.documentpublic == 'Y')
				{				
					aHTML[++h] = '<td id="tdWebsitePages_public-' + this.id + '" class="interfaceMainRow">' +
										'Public</td>';
				}
				else
				{
					aHTML[++h] = '<td id="tdWebsitePages_public-' + this.id + '" class="interfaceMainRow">' +
										'Private</td>';
				}		
										
				aHTML[++h] = '<td style="width:60px;text-align:right;" class="interfaceMainRow">';
				
				if (oOptions.remove)
				{	
					aHTML[++h] = '<span id="spanWebsitePage_options_remove-' + this.id + '" class="interfaceMainRowOptionsRemove"></span>';
				};	
					
				if (oOptions.view)
				{	
					aHTML[++h] = '<span id="spanWebsitePage_options_view-' + this.id + '" class="interfaceMainRowOptionsView"></span>';
				};
									
				aHTML[++h] = '</td></tr>'
			});
			
			aHTML[++h] = '</tbody></table>';

			$('#' + sXHTMLElementId).html(aHTML.join(''));
			
			
			if (oOptions.remove) 
			{
				$('.interfaceMainRowOptionsRemove').button( {
					text: false,
					icons: {
						primary: "ui-icon-close"
					}
				})
				.click(function() {
					ns1blankspaceWebsitePagesRemove({xhtmlElementID: this.id});
				})
				.css('width', '15px')
				.css('height', '17px')
			}
		
			if (oOptions.view) 
			{
				$('.interfaceMainRowOptionsView').button( {
					text: false,
					icons: {
						primary: "ui-icon-play"
					}
				})
				.click(function() {
					ns1blankspaceWebsitePagesAdd({xhtmlElementID: this.id})
				})
				.css('width', '15px')
				.css('height', '17px')
			}	
		}
	}	
}

function ns1blankspaceWebsitePagesAdd(oParam, oResponse)
{
	var sID; 
	var iDocumentType = 5;
	
	if (oResponse == undefined)
	{
		var sXHTMLElementID;

		if (oParam != undefined)
		{
			if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
		}
		
		if (sXHTMLElementID != undefined)
		{
			var aXHTMLElementID = sXHTMLElementID.split('-');
			var sID = aXHTMLElementID[1];
		}	
	
		var aHTML = [];
		var h = -1;

		aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMain">';
				
		aHTML[++h] = '<tr id="trInterfaceMainSetupWebsitePageAddTitle" class="interfaceMain">' +
						'<td id="tdInterfaceMainSetupWebsitePageAddTitle" class="interfaceMain">' +
						'Title' +
						'</td></tr>' +
						'<tr id="trInterfaceMainSetupWebsitePageAddTitleValue" class="interfaceMainText">' +
						'<td id="tdInterfaceMainSetupWebsitePageAddTitleValue" class="interfaceMainText">' +
						'<input id="inputInterfaceMainSetupWebsitePageAddTitle" class="inputInterfaceMainText">' +
						'</td></tr>';
		
		aHTML[++h] = '<tr id="trInterfaceMainSetupWebsitePageAddDetails">' +
						'<td id="tdInterfaceMainSetupWebsitePageAddDetails">';
						
			aHTML[++h] = '<table id="tableInterfaceMainColumn1Details" class="interfaceMain" cellspacing=0 cellpadding=0>';
			
			aHTML[++h] = '<tr id="trInterfaceMainSetupWebsitePageAddURL" class="interfaceMain">' +
							'<td id="tdInterfaceMainSetupWebsitePageAddURL" class="interfaceMain">' +
							'URL' +
							'</td>' +
							'<td id="tdInterfaceMainSetupWebsitePageAddType" class="interfaceMain">' +
							'Type' +
							'</td>' +
							'<td id="tdInterfaceMainSetupWebsitePageAddDocumentType" class="interfaceMain">' +
							'Format' +
							'</td>' +
							'<td id="tdInterfaceMainSetupWebsitePageAddSharing" class="interfaceMain">' +
							'Sharing' +
							'</td></tr>';
							
			aHTML[++h] = '<tr id="trInterfaceMainSetupWebsitePageAddURLValue" class="interfaceMainText">' +
							'<td id="tdInterfaceMainSetupWebsitePageAddURLValue" class="interfaceMainText" style="width:325px;">' +
							'<input id="inputInterfaceMainSetupWebsitePageAddURL" class="inputInterfaceMainText" style="width:275px;">' +
							'</td>';
					
			aHTML[++h] = '<td id="tdInterfaceMainSetupWebsitePageAddTypeValue" class="interfaceMainRadio">' +
							'<input type="radio" id="radioType9" name="radioType" value="9"/>Page' +
							'<br /><input type="radio" id="radioType2" name="radioType" value="2"/>Home' +
							'<br /><input type="radio" id="radioType3" name="radioType" value="3"/>Header' +
							'</td>';
							
			aHTML[++h] = '<td id="tdInterfaceMainSetupWebsitePageAddTypeValue" class="interfaceMainRadio">' +
							'<input type="radio" id="radioDocumentType5" name="radioDocumentType" value="5"/>HTML' +
							'<br /><input type="radio" id="radioDocumentType6" name="radioDocumentType" value="6"/>Text' +
							'</td>';
					
			aHTML[++h] = '<td id="tdInterfaceMainSetupWebsitePageAddSharingValue" class="interfaceMainText">' +
							'<input type="radio" id="radioPublicY" name="radioPublic" value="Y"/>Public' +
							'<br /><input type="radio" id="radioPublicN" name="radioPublic" value="N"/>Private' +
							'</td></tr>';
		
			aHTML[++h] = '</table>';
			
		aHTML[++h] = '</td></tr>';
		
		ns1blankspace.counter.editor = ns1blankspace.counter.editor + 1;
		
		aHTML[++h] = '<tr id="trInterfaceMainDetailsEditTextValue" class="interfaceMainTextMulti">' +
						'<td id="tdInterfaceMainDetailsEditTextValue" class="interfaceMainTextMulti" style="padding-top:15px;">' +
						'<textarea rows="10" cols="60" name="inputInterfaceMainEditText" id="inputInterfaceMainEditText' +
						ns1blankspace.counter.editor + '" data-editorcount="' + ns1blankspace.counter.editor + '"' +
						' class="inputInterfaceMainTextMultiLarge tinymceAdvanced"></textarea>' +
						'</td></tr>';
		
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainPagesColumn1').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
	
		aHTML[++h] = '<table id="tableInterfaceMainColumn2" class="interfaceMain">';
				
		aHTML[++h] = '<tr id="trInterfaceMainWebsitePageAddSave" class="interfaceMainAction">' +
						'<td id="tdInterfaceMainWebsitePageAddSave" class="interfaceMainAction">' +
						'<span style="width:80px;" id="spanInterfaceMainWebsitePageAddSave">Save</span>' +
						'</td></tr>';
	
		aHTML[++h] = '<tr id="trInterfaceMainWebsitePageAddCancel" class="interfaceMainAction">' +
						'<td id="tdInterfaceMainWebsitePageAddCancel" class="interfaceMainAction">' +
						'<span style="width:80px;" id="spanInterfaceMainWebsitePageAddCancel">Cancel</span>' +
						'</td></tr>';
						
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainPagesColumn2').html(aHTML.join(''));
		
		$('#spanInterfaceMainWebsitePageAddSave').button(
		{
			text: "Save"
		})
		.click(function() 
		{
			var sData = 'site=' + ns1blankspace.objectContext;
			sData += '&documenttitle=' + ns1blankspaceFormatSave($('#inputInterfaceMainSetupWebsitePageAddTitle').val());
			sData += '&documenturl=' + ns1blankspaceFormatSave($('#inputInterfaceMainSetupWebsitePageAddURL').val());
			sData += '&documenttype=' + ns1blankspaceFormatSave($('input[name="radioDocumentType"]:checked').val());
			sData += '&documentpublic=' + ns1blankspaceFormatSave($('input[name="radioPublic"]:checked').val());
			sData += '&location=' + ns1blankspaceFormatSave($('input[name="radioType"]:checked').val());
			
			if (parseInt($('input[name="radioDocumentType"]:checked').val()) == 5)
			{
				sData += '&documentcontent=' + ns1blankspaceFormatSave(tinyMCE.get('inputInterfaceMainEditText' + ns1blankspace.counter.editor).getContent());
			}
			else
			{
				sData += '&documentcontent=' + ns1blankspaceFormatSave($('#inputInterfaceMainEditText' + ns1blankspace.counter.editor).val());
			}
			
			sData += '&id=' + ns1blankspaceFormatSave(sID);
			
			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/setup/?method=SETUP_SITE_DOCUMENT_MANAGE',
				data: sData,
				dataType: 'json',
				success: function() {
					ns1blankspaceMainViewportShow("#divInterfaceMainPages");
					interfaceSetupWebsitePages();
				}
			});
		});
		
		$('#spanInterfaceMainWebsitePageAddCancel').button(
		{
			text: "Cancel"
		})
		.click(function() 
		{
			ns1blankspaceMainViewportShow("#divInterfaceMainPages");
			interfaceSetupWebsitePages();
		});
		
		$('[name="radioDocumentType"]').click(function()
		{
			if (parseInt($('input[name="radioDocumentType"]:checked').val()) == 5)
			{
				tinyMCE.execCommand('mceAddControl', false, 'inputInterfaceMainEditText' + ns1blankspace.counter.editor);
			}
			else
			{
				tinyMCE.execCommand('mceRemoveControl', false, 'inputInterfaceMainEditText' + ns1blankspace.counter.editor);
			}
		});
		
		tinyMCE.init(
		{
			mode : "none",
			height : "415px", 
			width : "100%",
			theme : "advanced",

			plugins : "table,advimage,advlink,emotions,iespell,insertdatetime,templateFields,preview,media,fullscreen,print,visualchars,nonbreaking,pagebreak,style,paste,searchreplace,print,contextmenu", 

			theme_advanced_buttons1_add_before : "forecolor,backcolor", 
			theme_advanced_buttons1_add : "fontselect,fontsizeselect", 
	 
			theme_advanced_buttons2_add : "separator,insertdate,inserttime,preview,zoom,separator,nonbreaking,pagebreak,visualchars", 
			theme_advanced_buttons2_add_before: "cut,copy,paste,pasteword,separator,search,replace,separator", 
			
			theme_advanced_buttons3_add_before : "tablecontrols,separator", 
			theme_advanced_buttons3_add : "emotions,iespell,fullscreen,print,templateFields,media,selectall,advhr",
	 
			
			plugin_insertdate_dateFormat : "%d-%m-%y", 
			plugin_insertdate_timeFormat : "%H:%M:%S", 
		
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_resizing : true,
		
			font_size_style_values : "8pt,10pt,12pt,14pt,18pt,24pt,36pt",
			
			extended_valid_elements : "style,input[accept|accesskey|align<bottom?left?middle?right?top|alt|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang|maxlength|name|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onselect|readonly<readonly|size|src|style|tabindex|title|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text|usemap|value],select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name|onblur|onchange|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|size|style|tabindex|title],ol[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|start|style|title|type],div[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],li[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title|type|value],iframe[src|width|height|name|align|frameborder|scrolling|marginheight|marginwidth]",

			fullscreen_new_window : true, 
			fullscreen_settings : 
			{ 
				theme_advanced_path_location : "top" 
			}, 
			relative_urls : false, 
			remove_script_host : false, 
			convert_urls : false, 
			visual : true, 
			gecko_spellcheck : true,
			content_css : ns1blankspace.xhtml.editorCSS,
			
			external_link_list_url : "/jscripts/ibcom/linkList.asp", 
			external_image_list_url : "/jscripts/ibcom/imageList.asp?LinkType=14&LinkId=" + ns1blankspace.objectContext, 
			media_external_list_url : "/jscripts/ibcom/mediaList.asp?LinkType=14&LinkId=" + ns1blankspace.objectContext,  TemplateLinkType : "0", 

		});
		
		if (sID != undefined)
		{
			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/setup/?method=SETUP_SITE_DOCUMENT_SEARCH&includecontent=1',
				data: 'id=' + sID,
				dataType: 'json',
				success: function(data) {ns1blankspaceWebsitePagesAdd(oParam, data)}
			});
		}
		else
		{
			$('[name="radioDocumentType"][value="5"]').attr('checked', true);
			$('[name="radioType"][value="9"]').attr('checked', true);
			tinyMCE.execCommand('mceAddControl', false, 'inputInterfaceMainEditText' + ns1blankspace.counter.editor);
			$('[name="radioPublic"][value="Y"]').attr('checked', true);	
		}
	}
	else
	{
		if (oResponse.data.rows.length != 0)
		{
			var oObjectContext = oResponse.data.rows[0];
			$('#inputInterfaceMainSetupWebsitePageAddTitle').val(oObjectContext.documenttitle);
			$('#inputInterfaceMainSetupWebsitePageAddURL').val(oObjectContext.documenturl);
			
			$('#inputInterfaceMainEditText' + ns1blankspace.counter.editor).val(ns1blankspaceFormatXHTML(oObjectContext.documentcontent));
			
			if (parseInt(oObjectContext.documenttype) == 5)
			{
				tinyMCE.execCommand('mceAddControl', false, 'inputInterfaceMainEditText' + ns1blankspace.counter.editor);
				//tinyMCE.get('inputInterfaceMainEditText' + ns1blankspace.counter.editor).setContent(oObjectContext.documentcontent)
			}
			else
			{	
				
			}	
			
			$('[name="radioType"][value="' + oObjectContext.location + '"]').attr('checked', true);
			$('[name="radioDocumentType"][value="' + oObjectContext.documenttype + '"]').attr('checked', true);
			$('[name="radioPublic"][value="' + oObjectContext.documentpublic + '"]').attr('checked', true);
		}
		else
		{
			$('[name="radioType"][value="9"]').attr('checked', true);
			$('[name="radioDocumentType"][value="5"]').attr('checked', true);
			tinyMCE.execCommand('mceAddControl', false, 'inputInterfaceMainEditText' + ns1blankspace.counter.editor);
			$('[name="radioPublic"][value="Y"]').attr('checked', true);					
		}
	}		
}

function ns1blankspaceWebsitePagesRemove(oParam, oResponse)
{
	var sXHTMLElementID;

	if (oParam != undefined)
	{
		if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
	}
	
	var aXHTMLElementID = sXHTMLElementID.split('-');
	var sID = aXHTMLElementID[1];
	
	if (oResponse == undefined)
	{	
		var sParam = 'method=SETUP_SITE_DOCUMENT_MANAGE&remove=1';
		var sData = 'id=' + sID;
		
		$.ajax(
		{
			type: 'POST',
			url: '/ondemand/setup/?' + sParam,
			data: sData,
			dataType: 'json',
			success: function(data){ns1blankspaceWebsitePagesRemove(oParam, data)}
		});
	}	
	else
	{
		if (oResponse.status == 'OK')
		{
			$('#' + sXHTMLElementID).parent().parent().fadeOut(500);
		}	
	}	
	
}

function interfaceSetupWebsiteForms(oParam, oResponse)
{
	var iObjectContext = ns1blankspace.objectContext;
	var sXHTMLElementId = 'divInterfaceMainForms';
	var oOptions = {view: true};
	var oActions = {};
	
	if (oParam != undefined)
	{
		if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
		if (oParam.xhtmlElementId != undefined) {sXHTMLElementId = oParam.xhtmlElementId}
		if (oParam.options != undefined) {oOptions = oParam.options}
		if (oParam.actions != undefined) {oActions = oParam.actions}
	}		
		
	if (oResponse == undefined)
	{
		var sParam = 'method=SETUP_SITE_FORM_SEARCH&site=' + iObjectContext;
		
		$.ajax(
		{
			type: 'GET',
			url: '/ondemand/setup/?' + sParam,
			dataType: 'json',
			success: function(data) {interfaceSetupWebsiteForms(oParam, data)}
		});

	}
	else
	{
		if (oActions != undefined)
		{
			var aHTML = [];
			var h = -1;	
						
			aHTML[++h] = '<table id="tableInterfaceMainForms" class="interfaceMain">' +
						'<tr id="trInterfaceMainFormsRow1" class="interfaceMainRow1">' +
						'<td id="tdInterfaceMainFormsColumn1" class="interfaceMainColumn1Large">' +
						ns1blankspace.xhtml.loading +
						'</td>' +
						'<td id="tdInterfaceMainFormsColumn2" class="interfaceMainColumn2Action">' +
						'</td>' +
						'</tr>' +
						'</table>';					
				
			$('#' + sXHTMLElementId).html(aHTML.join(''));
			sXHTMLElementId = 'tdInterfaceMainFormsColumn1';
			
			var aHTML = [];
			var h = -1;	
			
			aHTML[++h] = '<table id="tableInterfaceMainFormsColumn2" class="interfaceMainColumn2">';
			
			if (oActions.add)
			{
				aHTML[++h] = '<tr><td id="tdInterfaceMainFormsAdd" class="interfaceMainAction">' +
							'<span id="spanInterfaceMainFormsAdd">Add</span>' +
							'</td></tr>';
			}
			
			aHTML[++h] = '</table>';					
			
			$('#tdInterfaceMainFormsColumn2').html(aHTML.join(''));
		
			$('#spanInterfaceMainFormsAdd').button(
			{
				label: "Add"
			})
			.click(function() {
				interfaceSetupWebsiteFormMasterViewport({showHome: false, site: ns1blankspace.objectContext});
				interfaceSetupWebsiteFormNew();
			})
			
		}	
	
		var aHTML = [];
		var h = -1;
		
		if (oResponse.data.rows.length == 0)
	{
			aHTML[++h] = '<table id="tableWebsitePages" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
			aHTML[++h] = '<tbody>'
			aHTML[++h] = '<tr class="interfaceMainCaption">' +
							'<td class="interfaceMainRowNothing">No forms.</td></tr>';
			aHTML[++h] = '</tbody></table>';

			$('#' + sXHTMLElementId).html(aHTML.join(''));
		
		}
		else
		{
			aHTML[++h] = '<table id="tableWebsite" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
			aHTML[++h] = '<tbody>'
			aHTML[++h] = '<tr class="interfaceMainCaption">';
			aHTML[++h] = '<td class="interfaceMainCaption">Form</td>';
			aHTML[++h] = '<td>&nbsp;</td>';
			aHTML[++h] = '</tr>';
			
			$.each(oResponse.data.rows, function()
			{	
				aHTML[++h] = '<tr class="interfaceMainRow">';
				
				sTitle = this.title;
				if (sTitle == '') {sTitle = this.message}
				if (sTitle == '') {sTitle = this.typetext}
				sTitle = sTitle + ' (' + this.id + ')';
				
				aHTML[++h] = '<td id="tdWebsiteForms_title-' + this.id + '" class="interfaceMainRow">' +
										sTitle + '</td>';
										
				aHTML[++h] = '<td id="tdWebsiteForms_Options-' + this.id + 
									'-' + this.id +
									'" class="interfaceMainRowOptionsSelect">&nbsp;</td>';
										
				aHTML[++h] = '</tr>'
			});
			
			aHTML[++h] = '</tbody></table>';

			$('#' + sXHTMLElementId).html(aHTML.join(''));
			
			if (oOptions.view) 
			{
				$('.interfaceMainRowOptionsSelect').button( {
					text: false,
					icons: {
						primary: "ui-icon-play"
					}
				})
				.click(function() {
					interfaceSetupWebsiteFormMasterViewport({showHome: false});
					interfaceSetupWebsiteFormSearch(this.id, {source: 1})
				})
				.css('width', '15px')
				.css('height', '17px')
			}	
		}
	}	
}


function interfaceSetupWebsiteURLs(oParam, oResponse)
{
	var iObjectContext = ns1blankspace.objectContext;
	var sXHTMLElementId = 'divInterfaceMainURLs';
	var oOptions = {view: true, remove: true};
	var oActions = {add: true};
	
	if (oParam != undefined)
	{
		if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
		if (oParam.xhtmlElementId != undefined) {sXHTMLElementId = oParam.xhtmlElementId}
		if (oParam.options != undefined) {oOptions = oParam.options}
		if (oParam.actions != undefined) {oActions = oParam.actions}
	}		
		
	if (oResponse == undefined)
	{	
		$.ajax(
		{
			type: 'GET',
			url: '/ondemand/setup/?method=SETUP_SITE_URL_SEARCH&site=' + iObjectContext,
			dataType: 'json',
			success: function(data) {interfaceSetupWebsiteURLs(oParam, data)}
		});

	}
	else
	{
		if (oActions != undefined)
		{
			var aHTML = [];
			var h = -1;	
						
			aHTML[++h] = '<table id="tableInterfaceMainPages" class="interfaceMain">' +
						'<tr id="trInterfaceMainURLsRow1" class="interfaceMainRow1">' +
						'<td id="tdInterfaceMainWebsiteURLColumn1" class="interfaceMainColumn1Large">' +
						ns1blankspace.xhtml.loading +
						'</td>' +
						'<td id="tdInterfaceMainWebsiteURLColumn2" class="interfaceMainColumn2Action">' +
						'</td>' +
						'</tr>' +
						'</table>';					
				
			$('#' + sXHTMLElementId).html(aHTML.join(''));
			sXHTMLElementId = 'tdInterfaceMainWebsiteURLColumn1';
			
			var aHTML = [];
			var h = -1;	
			
			aHTML[++h] = '<table id="tableInterfaceMainWebsiteURLsColumn2" class="interfaceMainColumn2">';
			
			if (oActions.add)
			{
				aHTML[++h] = '<tr><td id="tdInterfaceMainURLsAdd" class="interfaceMainAction">' +
							'<span id="spanInterfaceMainURLsAdd">Add</span>' +
							'</td></tr>';
							
				aHTML[++h] = '<tr><td style="padding-top:20px;" id="tdInterfaceMainURLsAdd" class="interfaceMainAction">' +
							'CNAME your own url to site.mydigitalstructure.com' +
							'</td></tr>';			
			}
			
			aHTML[++h] = '</table>';					
			
			$('#tdInterfaceMainWebsiteURLColumn2').html(aHTML.join(''));
		
			$('#spanInterfaceMainURLsAdd').button(
			{
				label: "Add"
			})
			.click(function() {
				 ns1blankspaceWebsiteURLsAdd(oParam);
			})
			
		}	
	
		var aHTML = [];
		var h = -1;
		
		if (oResponse.data.rows.length == 0)
		{
			aHTML[++h] = '<table id="tableWebsitePages" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
			aHTML[++h] = '<tbody>'
			aHTML[++h] = '<tr class="interfaceMainCaption">' +
							'<td class="interfaceMainRowNothing">No URLs.</td></tr>';
			aHTML[++h] = '</tbody></table>';

			$('#' + sXHTMLElementId).html(aHTML.join(''));
		
		}
		else
		{
			aHTML[++h] = '<table id="tableClientAudits" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
			aHTML[++h] = '<tbody>'
			aHTML[++h] = '<tr class="interfaceMainCaption">';
			aHTML[++h] = '<td class="interfaceMainCaption">URL</td>';
			//aHTML[++h] = '<td class="interfaceMainCaption">Status</td>';
			aHTML[++h] = '<td class="interfaceMainCaption">&nbsp;</td>';
			aHTML[++h] = '</tr>';
			
			$.each(oResponse.data.rows, function()
			{
				aHTML[++h] = '<tr class="interfaceMainRow">';
								
				aHTML[++h] = '<td id="tdWebsiteURL_url-' + this.id + '" class="interfaceMainRow">' +
										this.url + '</td>';
										
				//aHTML[++h] = '<td id="tdWebsiteURL_status-' + this.id + '" class="interfaceMainRow">' +
				//						this.statustext + '</td>';
										
				aHTML[++h] = '<td style="width:60px;text-align:right;" class="interfaceMainRow">';
					
				if (oOptions.remove)
				{	
					aHTML[++h] = '<span id="spanWebsiteURL_options_remove-' + this.id + '" class="interfaceMainRowOptionsRemove"></span>';
				};	
					
				if (oOptions.view)
				{	
					aHTML[++h] = '<span id="spanWebsiteURL_options_view-' + this.id + '" class="interfaceMainRowOptionsView"></span>';
				};	
					
				aHTML[++h] = '</td>';
								
				aHTML[++h] = '</tr>';
			});
			
			aHTML[++h] = '</tbody></table>';

			$('#' + sXHTMLElementId).html(aHTML.join(''));
			
			if (oOptions.remove) 
			{
				$('.interfaceMainRowOptionsRemove').button( {
					text: false,
					icons: {
						primary: "ui-icon-close"
					}
				})
				.click(function() {
					ns1blankspaceWebsiteURLsRemove({xhtmlElementID: this.id});
				})
				.css('width', '15px')
				.css('height', '17px')
			}
			
			if (oOptions.view) 
			{
				$('.interfaceMainRowOptionsView').button( {
					text: false,
					icons: {
						primary: "ui-icon-play"
					}
				})
				.click(function() {
					ns1blankspaceWebsiteURLsAdd({xhtmlElementID: this.id})
				})
				.css('width', '15px')
				.css('height', '17px')
			}	
		}
	}	
}

function interfaceSetupWebsiteSave(oParam, oResponse)
{
	if (oResponse == undefined)
	{
		var sParam = 'method=SETUP_SITE_MANAGE';
		var sData = '_=1';
		var sCSSAttachment;
		
		if (ns1blankspace.objectContext != -1)
		{
			sParam += '&id=' + ns1blankspace.objectContext	
		}
		else
		{
			sCSSAttachment = -1;
		}
		
		if ($('#divInterfaceMainDetails').html() != '')
		{
			sData += '&title=' + ns1blankspaceFormatSave($('#inputInterfaceMainDetailsTitle').val());
			sData += '&email=' + ns1blankspaceFormatSave($('#inputInterfaceMainDetailsEmail').val());
			sData += '&status=' + ns1blankspaceFormatSave($('input[name="radioStatus"]:checked').val());	
		};

		if ($('#divInterfaceMainLayout').html() != '')
		{
			sData += '&headerheight=' + ns1blankspaceFormatSave($('#inputInterfaceMainLayoutHeaderHeight').val());
			sData += '&footerheight=' + ns1blankspaceFormatSave($('#inputInterfaceMainLayoutFooterHeight').val());
			sData += '&columns=' + ns1blankspaceFormatSave($('#inputInterfaceMainLayoutColumns').val());
			sData += '&layout=' + ns1blankspaceFormatSave($('input[name="radioLayout"]:checked').val());
			sCSSAttachment = $('input[name="radioCSSAttachment"]:checked').val();
		};
		
		if ($('#divInterfaceMainAdvanced').html() != '')
		{
			sData += '&ondemandstatus=' + ns1blankspaceFormatSave($('input[name="radioOnDemand"]:checked').val());	
			sData += '&usekeywordsastitle=' + ns1blankspaceFormatSave($('input[name="radioTitle"]:checked').val());
			sData += '&documenttype=' + ns1blankspaceFormatSave($('#inputInterfaceMainAdvancedDocumentType').val());
			sData += '&bodytag=' + ns1blankspaceFormatSave($('#inputInterfaceMainBodyTag').val());
		};
		
		if ($('#divInterfaceMainScripts').html() != '')
		{
			sData += '&headerscript=' + ns1blankspaceFormatSave($('#inputInterfaceMainScriptHeader').val());
			sData += '&footerscript=' + ns1blankspaceFormatSave($('#inputInterfaceMainScriptsFooter').val());
		};
		
		if (sCSSAttachment != undefined)
		{
			sData += '&cssattachment=' + sCSSAttachment;
		}	
		
		ns1blankspaceStatusWorking();

		$.ajax(
		{
			type: 'POST',
			url: '/ondemand/setup/?' + sParam,
			data: sData,
			dataType: 'json',
			success: function(data) {interfaceSetupWebsiteSave(oParam, data)}
		});
		
	}
	else
	{			
		if (oResponse.status == 'OK')
		{	
			ns1blankspaceStatus('Saved');
			
			if (ns1blankspace.objectContext == -1)
			{
				ns1blankspace.objectContext = oResponse.id;
				ns1blankspace.inputDetected = false;
				interfaceSetupWebsiteSearch('-' + ns1blankspace.objectContext, {source: 1});
			}	
		}
		else
		{
			ns1blankspaceStatus('Could not save the website!');
		}
	}
}

function interfaceSetupWebsiteAddAttachment()
{
	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<table id="tableInterfaceMainAddAttachment" class="interfaceMainDetails">';
	aHTML[++h] = '<tr id="trInterfaceMainAddAttachmentRow1" class="interfaceMain">' +
						'<td id="tdInterfaceMainAddAttachmentColumn1" class="interfaceMainColumn1">' +
						'</td>' +
						'<td id="tdInterfaceMainAddAttachmentColumn2" class="interfaceMainColumn2">' +
						'</td>' +
						'</tr>';
	aHTML[++h] = '</table>';					
		
	$('#divInterfaceMainAddAttachment').html(aHTML.join(''));
	$('#tdInterfaceMainAddAttachmentColumn1').html(ns1blankspaceAttachmentsUpload(1, 40));
	
	$('#spanInterfaceMainUpload').button(
		{
			label: "Upload"
		})
		.click(function() {
			 FileUpload();
		})
}

function FileUpload()
{
	//$.blockUI({ message: "<h2>Uploading..</h2>", timeout: 1000 });
	var oForm = document.frmonDemandFileUpload;
		 
	//iOnDemandTimerCount = 0;
  	oForm.submit();
 	//UpdateFileUpdateStatus();
	//iOnDemandTimer = setInterval('UpdateFileUpdateStatus()', 1000);
}

function UpdateFileUpdateStatus()
{
	var oDivStatus = document.getElementById('divonDemandFileUploadStatus');
	var oFrame = document.getElementById('ifonDemandUpload');
	var sStatus;
	var sCurrentState;
 
	if (oFrame.readyState) 
	{
		//IE
		sCurrentState = oFrame.readyState;
	}
	else 
	{
		//FF
		if (oFrame.contentDocument.body.innerHTML == 'OK') 
		{
			sCurrentState = 'complete';
		}
		else 
		{
			sCurrentState = oFrame.contentDocument.body.innerHTML;
		}
	}
 
	if (sCurrentState == 'complete') 
	{
		clearInterval(iOnDemandTimer);

		if (oDivStatus != null)
		{
			oDivStatus.setAttribute("class", "");
			oDivStatus.style.display = 'none';
		}
		$.blockUI({ message: "<h2>File Upload Complete..</h2>", timeout: 500 });
		
		//alert(sTempId);
		var aTempId = sTempId.split('-');
		
		if(aTempId[0] == 'expandmonthfolder')
		{
			PopulateMonths(sTempId);
		}
		else
		{
			$("#" + sTempId).html('');
			PopulateFiles(sTempId);
		}
	}
}

function ns1blankspaceWebsiteURLsAdd(oParam, oResponse)
{
	var sID; 
	
	if (oResponse == undefined)
	{
		var sXHTMLElementID;

		if (oParam != undefined)
		{
			if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
		}
		
		if (sXHTMLElementID != undefined)
		{
			var aXHTMLElementID = sXHTMLElementID.split('-');
			var sID = aXHTMLElementID[1];
		}	
	
		var aHTML = [];
		var h = -1;

		aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMain">';
				
		aHTML[++h] = '<tr id="trInterfaceMainSetupWebsiteURLAddURL" class="interfaceMain">' +
						'<td id="tdInterfaceMainSetupWebsiteURLAddURL" class="interfaceMain">' +
						'URL' +
						'</td></tr>' +
						'<tr id="trInterfaceMainSetupWebsiteURLAddURLValue" class="interfaceMainText">' +
						'<td id="tdInterfaceMainSetupWebsiteURLAddURLValue" class="interfaceMainText">' +
						'<input id="inputInterfaceMainSetupWebsiteURLAddURL" class="inputInterfaceMainText">' +
						'</td></tr>';
						
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainWebsiteURLColumn1').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
	
		aHTML[++h] = '<table id="tableInterfaceMainColumn2" class="interfaceMain">';
				
		aHTML[++h] = '<tr id="trInterfaceMainWebsiteURLAddSave" class="interfaceMainAction">' +
						'<td id="tdInterfaceMainWebsiteURLAddSave" class="interfaceMainAction">' +
						'<span style="width:80px;" id="spanInterfaceMainWebsiteURLAddSave">Save</span>' +
						'</td></tr>';
	
		aHTML[++h] = '<tr id="trInterfaceMainWebsiteURLAddCancel" class="interfaceMainAction">' +
						'<td id="tdInterfaceMainWebsiteURLAddCancel" class="interfaceMainAction">' +
						'<span style="width:80px;" id="spanInterfaceMainWebsiteURLAddCancel">Cancel</span>' +
						'</td></tr>';
						
		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainWebsiteURLColumn2').html(aHTML.join(''));
		
		$('#spanInterfaceMainWebsiteURLAddSave').button(
		{
			text: "Save"
		})
		.click(function() 
		{
			var sData = 'site=' + ns1blankspace.objectContext;
			sData += '&url=' + ns1blankspaceFormatSave($('#inputInterfaceMainSetupWebsiteURLAddURL').val());
			sData += '&id=' + ns1blankspaceFormatSave(sID);
			
			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/setup/?method=SETUP_SITE_URL_MANAGE',
				data: sData,
				dataType: 'json',
				success: function() {
					ns1blankspaceMainViewportShow("#divInterfaceMainURLs");
					interfaceSetupWebsiteURLs();
				}
			});
		});
		
		$('#spanInterfaceMainWebsiteURLAddCancel').button(
		{
			text: "Cancel"
		})
		.click(function() 
		{
			ns1blankspaceMainViewportShow("#divInterfaceMainURLs");
			interfaceSetupWebsiteURLs();
		});
		
		if (sID != undefined)
		{
			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/setup/?method=SETUP_SITE_URL_SEARCH',
				data: 'id=' + sID,
				dataType: 'json',
				success: function(data) {ns1blankspaceWebsiteURLsAdd(oParam, data)}
			});
		}
	}
	else
	{
		if (oResponse.data.rows.length != 0)
		{
			var oObjectContext = oResponse.data.rows[0];
			$('#inputInterfaceMainSetupWebsiteURLAddURL').val(oObjectContext.url)
		}
	}		
}

function ns1blankspaceWebsiteURLsRemove(oParam, oResponse)
{
	var sXHTMLElementID;

	if (oParam != undefined)
	{
		if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
	}
	
	var aXHTMLElementID = sXHTMLElementID.split('-');
	var sID = aXHTMLElementID[1];
	
	if (oResponse == undefined)
	{	
		var sParam = 'method=SETUP_SITE_URL_MANAGE&remove=1';
		var sData = 'id=' + sID;
		
		$.ajax(
		{
			type: 'POST',
			url: '/ondemand/setup/?' + sParam,
			data: sData,
			dataType: 'json',
			success: function(data){ns1blankspaceWebsiteURLsRemove(oParam, data)}
		});
	}	
	else
	{
		if (oResponse.status == 'OK')
		{
			$('#' + sXHTMLElementID).parent().parent().fadeOut(500);
		}	
	}	
	
}

function interfaceSetupWebApp(oParam, oResponse)
{
	var sAction; 
	
	if (oParam != undefined)
	{
		if (oParam.action != undefined) {sAction = (oParam.action).toLowerCase()}
	}
	
	if (sAction == undefined)
	{
		
		var aHTML = [];
		var h = -1;

		aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMain">';
				
		aHTML[++h] = '<tr id="trInterfaceMainSetupWebappjQuery" class="interfaceMain">' +
						'<td id="tdInterfaceMainSetupWebappjQuery" class="interfaceMain">' +
						'<span style="width:250px;font-size:0.875em" id="spanInterfaceMainWebappjQuery">1blankspace jQuery</span>' +
						'</td>' +
						'<td style="width:25px;"></td>' +
						'<td id="tdInterfaceMainSetupWebappjQueryMobile" class="interfaceMain">' +
						'<span style="width:250px;font-size:0.875em" id="spanInterfaceMainWebappjQueryMobile">1blankspace jQuery Mobile</span>' +
						'</td></tr>';
						
		aHTML[++h] = '<tr id="trInterfaceMainSetupWebappjQueryMobile" class="interfaceMain">' +
						'<td style="padding-top:15px;font-size:0.875em;color:#404040;">' +
						'Set the header scripts to reference the 1blankspace jQuery framework / design pattern.' +
						'</td>' +
						'<td style="width:25px;"></td>' +
						'<td style="padding-top:15px;font-size:0.875em;color:#404040;">' +
						'Set the header scripts to reference the 1blankspace jQuery Mobile framework / design pattern.' +
						'</td></tr>';
						
		aHTML[++h] = '</table>';					
		
		$('#divInterfaceMainWebapp').html(aHTML.join(''));
		
		$('#spanInterfaceMainWebappjQuery').button(
		{
			text: "1blankspace jQuery"
		})
		.click(function() 
		{
			interfaceSetupWebApp({action: 'jquery'});
		});
		
		$('#spanInterfaceMainWebappjQueryMobile').button(
		{
			text: "1blankspace jQuery Mobile"
		})
		.click(function() 
		{
			interfaceSetupWebApp({action: 'jquerymobile'});
		});
		
	}
	else
	{
		if (oResponse == undefined)
		{
			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/setup/?method=SETUP_SITE_MANAGE',
				data: 'id=' + ns1blankspace.objectContext + '&createapp=' + sAction,
				dataType: 'json',
				success: function(data) {interfaceSetupWebApp(oParam, data)}
			});
		}
		else
		{
			if (oResponse.status == 'OK')
			{
				$('#divInterfaceMainWebapp').html('Webapp created.')
				
				$.ajax(
				{
					type: 'POST',
					url: '/ondemand/setup/?method=SETUP_SITE_SEARCH',
					data: 'id=' + ns1blankspace.objectContext,
					dataType: 'json',
					success: function(oResponse) {
												$('#divInterfaceMainScripts').attr('onDemandLoading', '1');
												ns1blankspace.objectContextData.headerscript = (oResponse.data.rows[0]).headerscript;
											}
				});
				
			}
			else
			{
				$('#divInterfaceMainWebapp').html('Somethings gone wrong!')
			}
		}
	}		
}

function interfaceSetupWebsiteNew(oParam)
{
	ns1blankspace.objectContextData = undefined
	ns1blankspace.objectContext = -1;
	interfaceSetupWebsiteViewport();
	$('#spanns1blankspaceViewportControlAction').button({disabled: false});
	ns1blankspaceMainViewportShow("#divInterfaceMainDetails");
	interfaceSetupWebsiteDetails();
}

function interfaceSetupWebsiteRemove(oParam, oResponse)
{		
	var sVerifyCode;
	var sUserVerifyCode;
	
	if (oParam != undefined)
	{
		if (oParam.verifyCode != undefined) {sVerifyCode = oParam.verifyCode}
		if (oParam.userVerifyCode != undefined) {sUserVerifyCode = oParam.userVerifyCode}
	}
	
	if (sVerifyCode == undefined && ns1blankspace.objectContext != -1)
	{	
		
		var sParam = 'method=SETUP_SITE_MANAGE&remove=1';
		var sData = 'id=' + ns1blankspace.objectContext;
		
		$.ajax(
		{
			type: 'POST',
			url: '/ondemand/setup/?' + sParam,
			data: sData,
			dataType: 'json',
			success: function(data){interfaceSetupWebsiteRemove({verifyCode: data.verifycode})}
		});
			
	}
	else if (sVerifyCode != undefined && sUserVerifyCode == undefined)
	{
		var aHTML = [];
		var h = -1;

		aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceActionOptions">';
				
		aHTML[++h] = '<tr id="trInterfaceMainSetupWebsiteRemove" class="interfaceMain">' +
						'<td id="tdInterfaceMainSetupWebsiteRemove" class="interfaceMain">' +
						'Enter verification code: ' + sVerifyCode +
						'</td></tr>' +
						'<tr id="trInterfaceMainSetupWebsiteRemoveVerifyValue" class="interfaceMainText">' +
						'<td id="tdInterfaceMainSetupWebsiteRemoveVerifyValue" class="interfaceMainText">' +
						'<input id="inputInterfaceMainSetupWebsiteRemoveVerify" class="inputInterfaceMainText">' +
						'</td></tr>' +
						'<tr class="interfaceMainText">' +
						'<td class="interfaceMainText">' +
						'<span id="spanInterfaceMainSetupWebsiteRemoveVerify">Remove</span>' +
						'</td></tr>';
						
		aHTML[++h] = '</table>';					
		
		$('#divns1blankspaceViewportControlOptions').html(aHTML.join(''));
		
		$('#spanInterfaceMainSetupWebsiteRemoveVerify').button(
		{
			text: "Remove"
		})
		.click(function() 
		{
			interfaceSetupWebsiteRemove({verifyCode: sVerifyCode, userVerifyCode: $('#inputInterfaceMainSetupWebsiteRemoveVerify').val()})
		});
	
	}
	else if (sVerifyCode != undefined && sUserVerifyCode != undefined && oResponse == undefined)
	{
		var sParam = 'method=SETUP_SITE_MANAGE&remove=1';
		var sData = 'id=' + ns1blankspace.objectContext + '&verifycode=' + sUserVerifyCode;
		
		$.ajax(
		{
			type: 'POST',
			url: '/ondemand/setup/?' + sParam,
			data: sData,
			dataType: 'json',
			success: function(data){interfaceSetupWebsiteRemove(oParam, data)}
		});

	}
	else if (oResponse != undefined)
	{
		if (oResponse.notes == 'REMOVED')
		{
			alert("Website removed");
		}
		else
		{
			alert('Cannot remove website!')
		}
	}	
	else
	{
		alert('Cannot remove website!')
	}	
	
}
