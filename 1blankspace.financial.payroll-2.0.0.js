/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

function interfaceFinancialPayrollMasterViewport(oParam)
{
	interfaceFinancialMasterInitialise();
	
	var bShowHome = true
	
	if (oParam != undefined)
	{
		if (oParam.showHome != undefined) {bShowHome = oParam.showHome}	
	}

	ns1blankspace.object = -1;
	ns1blankspace.objectContextData = undefined;
	ns1blankspace.objectName = 'Payroll';
	ns1blankspace.objectContext = -1;
	
	if (bShowHome)
	{
		ns1blankspaceViewportDestination({
			newDestination: 'interfaceFinancialPayrollMasterViewport({showHome: true});',
			move: false
			})		
	}	
			
	ns1blankspaceReset();
	
	$('#divns1blankspaceViewportControlSet').button(
	{
		label: "Payroll"
	});
	
	$('#inputns1blankspaceViewportControlSearch').keyup(function(event)
	{
		if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
        ns1blankspace.timer.delayCurrent = setTimeout("interfaceFinancialPayrollSearch('inputns1blankspaceViewportControlSearch')", ns1blankspace.option.typingWait);
	});
	
	$('#spanns1blankspaceViewportControlSearch').click(function(event)
	{
		interfaceFinancialPayrollSearch('inputns1blankspaceViewportControlSearch');
	});
	
	$('#spanns1blankspaceViewportControlSearchOptions').click(function(event)
	{
		interfaceFinancialPayrollSearchOptions();
	});
	
	$('#spanns1blankspaceViewportControlNew').click(function(event)
	{
		interfaceFinancialPayrollNew();
	})
	
	$('#spanns1blankspaceViewportControlNewOptions').click(function(event)
	{
		interfaceFinancialPayrollNewOptions();
	});
	
	$('#spanns1blankspaceViewportControlAction').click(function(event)
	{
		interfaceFinancialPayrollSave();
	});
	
	$('#spanns1blankspaceViewportControlActionOptions').click(function(event)
	{
		interfaceFinancialPayrollSaveOptions();
	});
	
	$('#spanns1blankspaceViewportControlSetup').click(function(event)
	{
		interfaceFinancialSetup();
	});
	
	$('#spanns1blankspaceViewportControlSetupOptions').click(function(event)
	{
		interfaceFinancialSetupOptions();
	});
	
	$('#spanns1blankspaceViewportControlHelp').click(function(event)
	{
		interfaceFinancialHelp();
	});
	
	$('#spanns1blankspaceViewportControlHelpOptions').click(function(event)
	{
		interfaceFinancialHelpOptions();
	});
	
	$('td.interfaceViewportMasterControlBrowse').click(function(event)
	{
		interfaceFinancialSearch(event.target.id, {source: ns1blankspace.data.searchSource.browse});
	});
	
	$('td.interfaceViewportMasterControlBrowseAll').click(function(event)
	{
		interfaceFinancialSearch(event.target.id, {source: ns1blankspace.data.searchSource.browse});
	});
	
	if (ns1blankspace.option.setFocus) {$('#inputns1blankspaceViewportControlSearch').focus()};
	if (bShowHome) {interfaceFinancialPayrollHomeShow()};	
}

function interfaceFinancialPayrollHomeShow(oParam, oResponse)
{		
	if (oResponse == undefined)
	{
		var aHTML = [];
		var h = -1;
					
		aHTML[++h] = '<table id="tableInterfaceViewportMain" class="interfaceViewportMain">';
		aHTML[++h] = '<tr id="trInterfaceViewportMain" class="interfaceViewportMain">' +
						'<td id="tdInterfaceProjectHomeMostLikely" class="interfaceViewportMain">' +
						ns1blankspace.xhtml.loading + 
						'</td>' +
						'</tr>';
		aHTML[++h] = '</table>';					
		
		$('#divInterfaceMain').html(aHTML.join(''));
		
		var aHTML = [];
		var h = -1;
					
		aHTML[++h] = '<table>';
		aHTML[++h] = '<tr>' +
						'<td id="ns1blankspaceViewportFinancialLarge" class="ns1blankspaceViewportImageLarge">' +
						'&nbsp;' + 
						'</td>' +
						'</tr>';
		aHTML[++h] = '</table>';		
		
		aHTML[++h] = '<table>';
		
		aHTML[++h] = '<tr id="trInterfaceViewportControlPayRuns" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlPayRuns" class="interfaceViewportControl interfaceViewportControlHighlight">Pays</td>' +
						'</tr>';
						
		aHTML[++h] = '<tr id="trInterfaceViewportControlEmployees" class="interfaceViewportControl">' +
						'<td id="tdInterfaceViewportControlEmployees" class="interfaceViewportControl">Employees</td>' +
						'</tr>';	
							
		aHTML[++h] = '</table>';
	
		$('#divInterfaceViewportControl').html(aHTML.join(''));	
		
		$('#tdInterfaceViewportControlPayRuns').click(function(event)
		{
			ns1blankspaceMainViewportShow("#divInterfaceMainPayRun");
			interfaceFinancialPayrollHomeShow();
		});
	
		$('#tdInterfaceViewportControlEmployees').click(function(event)
		{
			ns1blankspaceMainViewportShow("#divInterfaceMainEmployee");
			interfaceFinancialPayrollEmployees();
		});
		
		var aHTML = [];
		var h = -1;
		
		aHTML[++h] = '<div id="divInterfaceMainPayRun" class="divInterfaceViewportMain"></div>';
		aHTML[++h] = '<div id="divInterfaceMainEmployee" class="divInterfaceViewportMain"></div>';
		aHTML[++h] = '<div id="divInterfaceMainNew" class="divInterfaceViewportMain"></div>';

		$('#divInterfaceMain').html(aHTML.join(''));
	
		$('#divns1blankspaceViewportControlOptions').hide(ns1blankspace.option.hideSpeedOptions);
		
		var oSearch = new AdvancedSearch();
		oSearch.method = 'FINANCIAL_PAYROLL_PAY_PERIOD_SEARCH';
		oSearch.addField('startdate,paydate,statustext');
		oSearch.rows = 10;
		oSearch.sort('paydate', 'desc');
		oSearch.getResults(function(data){interfaceFinancialPayrollHomeShow(oParam, data)});		
	}
	else
	{
		var aHTML = [];
		var h = -1;

		if (oResponse.data.rows.length == 0)
		{
			aHTML[++h] = '<table id="tableInterfaceFinancialPayrollHomeMostLikely">';
			aHTML[++h] = '<tr class="trInterfaceFinancialPayrollHomeMostLikelyNothing">';
			aHTML[++h] = '<td class="tdInterfaceFinancialPayrollHomeMostLikelyNothing">Click New to create a invoice.</td>';
			aHTML[++h] = '</tr>';
			aHTML[++h] = '</table>';
		}
		else
		{	
			aHTML[++h] = '<table id="tableFinancialPayroll" border="0" cellspacing="0" cellpadding="4" class="interfaceMain">';
			aHTML[++h] = '<tbody>'
		
			$.each(oResponse.data.rows, function()
			{
				aHTML[++h] = '<tr class="interfaceMainRow">';
						
				aHTML[++h] = '<td id="tdPayroll_paydate-' + this.id + '" class="interfaceHomeMostLikely" style="width:150px;">' +
										this["paydate"] + '</td>';
				
				aHTML[++h] = '<td id="interfacePayroll_lastreconcileddate-' + this.id + '" class="interfaceHomeMostLikelySub">' +
											this.statustext + '</td>';
																			
				aHTML[++h] = '</tr>';
			});
	
			aHTML[++h] = '</tbody></table>';
		}
	
		$('#divInterfaceMainPayRun').html(aHTML.join(''));

		$('.interfaceHomeMostLikely').click(function(event) {
			interfaceFinancialPayrollSearch(event.target.id, {source: 1});
		});
	}	
}

function interfaceFinancialPayrollSearch(sXHTMLElementId, oParam)
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
	
	if (sSearchContext != undefined  && iSource != ns1blankspace.data.searchSource.browse)
	{
		$('#divInterfaceViewportControl').html(ns1blankspace.xhtml.loading);
		
		ns1blankspace.objectContext = sSearchContext;
		
		var oSearch = new AdvancedSearch();
		oSearch.method = 'FINANCIAL_PAYROLL_PAY_PERIOD_SEARCH';
		oSearch.addField('startdate,paydate,statustext,status,notes,modifieddate');
		oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
		
		oSearch.getResults(function(data) {interfaceFinancialPayrollShow(oParam, data)});
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
			var aSearch = sSearch.split('-');
			sSearchText = aSearch[1];
		}
		
		if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
		{
			ns1blankspaceOptionsSetPosition(sElementId);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'FINANCIAL_PAYROLL_PAY_PERIOD_SEARCH';
			oSearch.addField('notes,paydate');
			oSearch.addFilter('notes', 'TEXT_IS_LIKE', sSearchText);
			
			oSearch.getResults(function(data) {interfaceFinancialPayrollSearchShow(oParam, data)});	
		}
	};	
}

function interfaceFinancialPayrollSearchShow(oParam, oResponse)
{

	var iColumn = 0;
	var aHTML = [];
	var h = -1;
	var	iMaximumColumns = 1;
		
	if (oResponse.data.rows.length == 0)
	{
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
		
			aHTML[++h] = '<td class="interfaceSearch" id="' + +
							'-' + this.id + '">' +
							this.notes +
							'</td>';
			
			if (iColumn == iMaximumColumns)
			{
				aHTML[++h] = '</tr>'
				iColumn = 0;
			}	
		});
    	
		aHTML[++h] = '</tbody></table>';

		$('#divns1blankspaceViewportControlOptions').html(aHTML.join(''));
		$('#divns1blankspaceViewportControlOptions').show(ns1blankspace.option.showSpeedOptions);
		
		$('td.interfaceSearch').click(function(event)
		{
			$('#divns1blankspaceViewportControlOptions').html('&nbsp;');
			$('#divns1blankspaceViewportControlOptions').hide(ns1blankspace.option.hideSpeedOptions)
			interfaceFinancialPayrollSearch(event.target.id, {source: 1});
		});
	}		
}

function interfaceFinancialPayrollViewport()
{
	
	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<div id="divInterfaceViewportControlContext" class="interfaceViewportControlContext"></div>';
	
	aHTML[++h] = '<table class="interfaceViewportControl">';
	
	aHTML[++h] = '<tr id="trInterfaceViewportControl1" class="interfaceViewportControl">' +
					'<td id="tdInterfaceViewportControlSummary" class="interfaceViewportControl interfaceViewportControlHighlight">Summary</td>' +
					'</tr>';
				
	aHTML[++h] = '<tr id="trInterfaceViewportControl2" class="interfaceViewportControl">' +
					'<td id="tdInterfaceViewportControlDetails" class="interfaceViewportControl">Details</td>' +
					'</tr>';
	
	aHTML[++h] = '<tr id="trInterfaceViewportControlItem" class="interfaceViewportControl">' +
					'<td id="tdInterfaceViewportControlPays" class="interfaceViewportControl">Pays</td>' +
					'</tr>';

	aHTML[++h] = '</table>';					
			
	$('#divInterfaceViewportControl').html(aHTML.join(''));
	
	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<div id="divInterfaceMainContext" class="divInterfaceViewportMainContext"></div>';
	aHTML[++h] = '<div id="divInterfaceMainSummary" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainDetails" class="divInterfaceViewportMain"></div>';
	aHTML[++h] = '<div id="divInterfaceMainPays" class="divInterfaceViewportMain"></div>';
	
	$('#divInterfaceMain').html(aHTML.join(''));
	
	$('#tdInterfaceViewportControlSummary').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainSummary");
		interfaceFinancialPayrollSummary();
	});
	
	$('#tdInterfaceViewportControlDetails').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainDetails");
		interfaceFinancialPayrollDetails();
	});
	
	$('#tdInterfaceViewportControlPays').click(function(event)
	{
		ns1blankspaceMainViewportShow("#divInterfaceMainPays", true);
		interfaceFinancialPayrollPays();
	});
}

function interfaceFinancialPayrollShow(oParam, oResponse)
{	
	$('#divns1blankspaceViewportControlOptions').hide(ns1blankspace.option.hideSpeedOptions);
	interfaceFinancialPayrollViewport();
		
	var aHTML = [];
	var h = -1;
	
	if (oResponse.data.rows.length == 0)
	{
		ns1blankspace.objectContextData = undefined;
			
		aHTML[++h] = '<table><tbody><tr><td valign="top">Sorry can\'t find this pay period.</td></tr>';
		aHTML[++h] = '<tr>&nbsp;</tr></tbody></table>';
			
		$('#divInterfaceMain').html(aHTML.join(''));
	}
	else
	{
		ns1blankspace.objectContextData = oResponse.data.rows[0];
			
		$('#spanns1blankspaceViewportControlAction').button({disabled: false});
			
		$('#divInterfaceViewportControlContext').html(ns1blankspace.objectContextData.paydate +
			'<br /><span class="interfaceViewportControlSubContext" id="spanInterfaceViewportControlSubContext_status">' + ns1blankspace.objectContextData.statustext + '</span>');
		
		ns1blankspaceViewportDestination({
			newDestination: 'interfaceFinancialPayrollMasterViewport({showHome: false});interfaceFinancialPayrollSearch("-' + ns1blankspace.objectContext + '")',
			move: false
			})
	
		ns1blankspaceObjectViewportHistory({functionDefault: 'interfaceFinancialPayrollSummary()'});
	}		
}	

function interfaceFinancialPayrollSummary(oParam, oResponse)
{
	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<table id="tableInterfaceMainSummary" class="interfaceMain">';
	aHTML[++h] = '<tr id="trInterfaceMainSummaryRow1" class="interfaceMainRow1">' +
				'<td id="tdInterfaceMainSummaryColumn1Large" class="interfaceMainColumn1Large">' +
					'</td>' +
					'<td id="tdInterfaceMainSummaryColumn2Action" style="width:150px;" class="interfaceMainColumn2">' +
					'</td>' +
					'</tr>';
	aHTML[++h] = '</table>';				

	$('#divInterfaceMainSummary').html(aHTML.join(''));	

	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMainColumn1">';
					
	aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryStartDate" class="interfaceMainSummary">Start Date</td></tr>' +
						'<tr><td id="tdInterfaceMainSummaryStartDateValue" class="interfaceMainSummaryValue">' +
						ns1blankspace.objectContextData.startdate +
						'</td></tr>';		
										
	aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryPayDate" class="interfaceMainSummary">Pay Date</td></tr>' +
						'<tr><td id="tdInterfaceMainSummaryPayDateValue" class="interfaceMainSummaryValue">' +
						ns1blankspace.objectContextData.paydate +
						'</td></tr>';		
	
	aHTML[++h] = '</table>';					

	$('#tdInterfaceMainSummaryColumn1Large').html(aHTML.join(''));

	var aHTML = [];
	var h = -1;	
	
	aHTML[++h] = '<table id="tableInterfaceMainColumn2" class="interfaceMainColumn2" style="width: 100%">';
	
	if (ns1blankspace.objectContextData.statustext != '')
	{	
		aHTML[++h] = '<tr><td class="interfaceMainSummary" style="padding-bottom:10px;">' +
					ns1blankspace.objectContextData.statustext +
					'</td></tr>';				
	}
	
	if (ns1blankspace.objectContextData.status == 1)
	{	
		aHTML[++h] = '<tr><td>' +
					'<span style="font-size:0.75em;" id="spanInterfaceMainStatusComplete" class="orderAction">Complete</span>' +
					'</td></tr>';			
	}
	
	aHTML[++h] = '</table>';					
	
	$('#tdInterfaceMainSummaryColumn2Action').html(aHTML.join(''));	

	$('#spanInterfaceMainStatusComplete').button(
	{
	})
	.click(function()
		{
			$.ajax(
			{
				type: 'POST',
				url: ns1blankspaceEndpointURL('FINANCIAL_PAYROLL_PAY_PERIOD_MANAGE'),
				data: 'status=2&id=' + ns1blankspace.objectContext,
				dataType: 'json',
				success: function() {interfaceFinancialPayrollSearch('-' + ns1blankspace.objectContext)}
			});
	});
		
}

function interfaceFinancialPayrollDetails(oParam)
{	
	var aHTML = [];
	var h = -1;
	
	aHTML[++h] = '<table class="interfaceMain" cellspacing=0 cellpadding=0>' +
			'<tr>' +
			'<td id="tdInterfaceMainDetails" style="padding-right:15px;width:200px;">' +
			'</td>' +
			'<td id="tdInterfaceMainDetails2" class="interfaceMainColumn2x">&nbsp;' +
			'</td>' +
			'</tr>' +
			'</table>';			

	$('#divInterfaceMainDetails').html(aHTML.join(''));
		
	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<table class="interfaceMain">';
	
	aHTML[++h] = '<tr class="interfaceMain">' +
					'<td class="interfaceMain">' +
					'Start Date' +
					'</td></tr>' +
					'<tr class="interfaceMainText">' +
					'<td class="interfaceMainText">' +
					'<input id="inputInterfaceMainDetailsStartDate" class="inputInterfaceMainDate">' +
					'</td></tr>';	

	aHTML[++h] = '<tr class="interfaceMain">' +
					'<td class="interfaceMain">' +
					'End Date' +
					'</td></tr>' +
					'<tr class="interfaceMainText">' +
					'<td class="interfaceMainText">' +
					'<input id="inputInterfaceMainDetailsPayDate" class="inputInterfaceMainDate">' +
					'</td></tr>';	
						
	aHTML[++h] = '<tr class="interfaceMain">' +
					'<td class="interfaceMain">' +
					'Status' +
					'</td></tr>' +
					'<tr>' +
					'<td class="interfaceMainRadio">' +
					'<input type="radio" id="radioStatus1" name="radioStatus" value="1"/>In Progress' +
					'<br /><input type="radio" id="radioStatus2" name="radioStatus" value="2"/>Completed' +
					'</td></tr>';
		
	aHTML[++h] = '<tr><td class="interfaceMain">Frequency</td></tr>' +
						'<tr><td class="interfaceMainRadio">' +
						'<input type="radio" id="radioFrequency1" name="radioFrequency" value="1"/>Weekly' +
						'<br /><input type="radio" id="radioFrequency2" name="radioFrequency" value="2"/>Fortnightly' +
						'<br /><input type="radio" id="radioFrequency3" name="radioFrequency" value="3"/>Monthly' +
						'<br /><input type="radio" id="radioFrequency4" name="radioFrequency" value="4"/>Bi/Semi Monthly' +
						'</td></tr>';
																																							
	aHTML[++h] = '</table>';					
	
	$('#tdInterfaceMainDetails').html(aHTML.join(''));
	
	$('input.inputInterfaceMainDate').datepicker({dateFormat: 'dd M yy'});

	if (ns1blankspace.objectContextData != undefined)
	{
		$('#inputInterfaceMainDetailsStartDate').val(ns1blankspace.objectContextData.startdate);
		$('#inputInterfaceMainDetailsPayDate').val(ns1blankspace.objectContextData.paydate);
		$('[name="radioStatus"][value="' + ns1blankspace.objectContextData.status + '"]').attr('checked', true);
		$('[name="radioFrequency"][value="' + ns1blankspace.objectContextData.frequency + '"]').attr('checked', true);
		$('#inputInterfaceMainDetailsNotes').val(ns1blankspace.objectContextData.notes);	
	}
}

function interfaceFinancialPayrollSave(oParam)
{
	if (ns1blankspace.objectContext != -1)
	{
		var sData = 'id=' + ns1blankspace.objectContext;
		
		if ($('#divInterfaceMainDetails').html() != '')
		{
			sData += '&startdate=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsStartDate').val());
			sData += '&paydate=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsPayDate').val());
			//sData += '&frequency=' + $('input[name="radioFrequency"]:checked').val();
			sData += '&status=' + $('input[name="radioStatus"]:checked').val();
		};

		$.ajax(
		{
			type: 'POST',
			url: '/ondemand/financial/?method=FINANCIAL_PAYROLL_PAY_PERIOD_MANAGE',
			data: sData,
			dataType: 'json',
			success: function(data)
			{
				ns1blankspaceStatus('Saved.');
			}	
		});		
	}	
}


function interfaceFinancialPayrollNew()
{
	var aHTML = [];
	var h = -1;
	
	ns1blankspaceMainViewportShow("#divInterfaceMainNew");

	aHTML[++h] = '<table style="width:100%">' +
					'<tr>' +
					'<td id="tdInterfaceMainPayrollNewColumn1" style="width:50%">' +
					ns1blankspace.xhtml.loading +
					'</td>' +
					'<td id="tdInterfaceMainPayrollNewColumn2" class="interfaceMainColumn2" style="font-size:0.75em">' +
					'</td>' +
					'</tr></table>';				

	$('#divInterfaceMainNew').html(aHTML.join(''));

	var aHTML = [];
	var h = -1;

	aHTML[++h] = '<table class="interfaceMain" style="font-size:0.875em">' +
						'<tr><td>' +
						'<span style="width:70px;" id="spanPayrollNew_options_save">Next</span>' +
						'</td></tr>' +
						'<tr><td>' +
						'<span style="width:70px;" id="spanPayrollNew_options_cancel">Cancel</span>' +
						'</td></tr>' +
						'</table>';	

	$('#tdInterfaceMainPayrollNewColumn2').html(aHTML.join(''));

	$('#spanPayrollNew_options_save').button(
	{
		text: "Next"
	})
	.click(function() 
	{
		interfaceFinancialPayrollHomeSave();
	});

	$('#spanPayrollNew_options_cancel').button(
	{
		text: "Cancel"
	})
	.click(function() 
	{
		$('td.interfaceViewportControlHighlight :first').click();
	});

	var aHTML = [];
	var h = -1;

	if ($('#tdInterfaceViewportControlPayRuns').hasClass('interfaceViewportControlHighlight'))
	{
		aHTML[++h] = '<table><tr>' + 
						'<td class="interfaceMainRowNothing">Just check that you want to create the next pay period.<br /><br />If you do, then please click Next.</td>' + 
						'</tr>' +
						'</table>';
	}
	else
	{	
		aHTML[++h] = '<table id="tableInterfaceMainDetailsColumn1" class="interfaceMain" style="padding-right:15px;">';

		aHTML[++h] = '<tr class="interfaceMain">' +
						'<td class="interfaceMain">' +
						'First Name' +
						'</td></tr>' +
						'<tr class="interfaceMainText">' +
						'<td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsFirstName" class="inputInterfaceMainText">' +
						'</td></tr>';

		aHTML[++h] = '<tr class="interfaceMain">' +
						'<td class="interfaceMain">' +
						'Last Name' +
						'</td></tr>' +
						'<tr class="interfaceMainText">' +
						'<td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsLastName" class="inputInterfaceMainText">' +
						'</td></tr>';			
		
		aHTML[++h] = '</table>';					
	}

	$('#tdInterfaceMainPayrollNewColumn1').html(aHTML.join(''));

}

function interfaceFinancialPayrollHomeSave(oParam, oResponse)
{
	var iType;
	var iID;

	if (oParam != undefined)
	{
		if (oParam.type != undefined) {iType = oParam.type};
		if (oParam.id != undefined) {iType = oParam.id};
	}		

	if (iType == undefined)
	{	
		if ($('#tdInterfaceViewportControlPayRuns').hasClass('interfaceViewportControlHighlight')) {iType = 1};
		if ($('#tdInterfaceViewportControlEmployees').hasClass('interfaceViewportControlHighlight')) {iType = 2};
	}

	ns1blankspaceStatusWorking();

	//PAYS
	if (iType == 1)
	{
		$.ajax(
		{
			type: 'POST',
			url: ns1blankspaceEndpointURL('FINANCIAL_PAYROLL_PAY_PROCESS'),
			data: 'type=1',
			dataType: 'json',
			success: function(data) {
				if (data.status == 'OK')
				{	
					ns1blankspaceStatus('New pay period created.');
					ns1blankspace.objectContext = data.period;
					interfaceFinancialPayrollSearch('-' + ns1blankspace.objectContext);
				}	
			}
		});
	}

	//EMPLOYEES
	if (iType == 2)
	{
		if (iID == undefined)
		{	
			if (oResponse == undefined)
			{	
				if ($('#inputInterfaceMainDetailsFirstName').val() == '' ||
					$('#inputInterfaceMainDetailsLastName').val() == '')
				{
					ns1blankspaceError('Missing information.');
				}	
				else
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_PERSON_SEARCH';
					oSearch.addField('firstname');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.contactBusiness);
					oSearch.addFilter('firstname', 'EQUAL_TO', $('#inputInterfaceMainDetailsFirstName').val());
					oSearch.addFilter('surname', 'EQUAL_TO', $('#inputInterfaceMainDetailsLastName').val());

					oSearch.getResults(interfaceFinancialPayrollSave);
				}
			}
			else	
			{
				if (oResponse.data.rows.length > 0)
				{
					interfaceFinancialPayrollSaveProcess(
					{
						contactPerson: oResponse.data.rows[0].contactperson,
						contactBusiness: ns1blankspace.contactBusiness
					});		
				}
				else
				{
					var sData = 'contactbusiness=' + ns1blankspace.contactBusiness;
					sData += '&firstname=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsFirstName').val());
					sData += '&surname=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsLastName').val());

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspaceEndpointURL('CONTACT_PERSON_MANAGE'),
						data: sData,
						dataType: 'json',
						success: function(data)
							{
								if (data.status == 'OK')
								{
									interfaceFinancialPayrollHomeSaveProcess(
									{
										contactPerson: data.id,
										contactBusiness: ns1blankspace.contactBusiness
									});	
								}
								else
								{
									ns1blankspaceError('Could not add employee.')
								}
							}
					});
				}	
			}
		}
		else
		{
			//save employee.

		}	
	}
}

function interfaceFinancialPayrollHomeSaveProcess(oParam)
{
	var iContactBusiness = ns1blankspace.contactBusiness;
	var iContactPerson;
	var iID;
	var sData;

	if (oParam != undefined)
	{
		if (oParam.contactBusiness != undefined) {iContactBusiness = oParam.contactBusiness}
		if (oParam.contactPerson != undefined) {iContactPerson = oParam.contactPerson}
	}		

	sData = 'id=' + ns1blankspace.util.fs(iID);
	sData += '&contactbusiness=' + iContactBusiness;
	sData += '&contactperson=' + iContactPerson;
	sData += '&status=2';
	
	$.ajax(
	{
		type: 'POST',
		url: '/ondemand/financial/?method=FINANCIAL_PAYROLL_EMPLOYEE_MANAGE',
		data: sData,
		dataType: 'json',
		success: function(data)
		{
			ns1blankspaceStatus('Saved.');
			ns1blankspaceMainViewportShow("#divInterfaceMainEmployee");
			interfaceFinancialPayrollEmployees();
		}	
	});		
}

function interfaceFinancialPayrollEmployees(oParam, oResponse)
{
	var iStep = 1;
	var iStepAction = 1;
	var iEmployee;
	var iID = '';
	var sXHTMLElementID;

	if (oParam != undefined)
	{
		if (oParam.step != undefined) {iStep = oParam.step};
		if (oParam.stepAction != undefined) {iStepAction = oParam.stepAction};
		if (oParam.employee != undefined) {iEmployee = oParam.employee};
		if (oParam.id != undefined) {iID = oParam.id};
		if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
	}
	else
	{
		oParam = {step: 1};
	}
	
	if (sXHTMLElementID != undefined)
	{
		var aXHTMLElementID = sXHTMLElementID.split('-');
	}
		
	//EMPLOYEES LIST
	if (iStep == 1)	
	{
		var aHTML = [];
		var h = -1;
			
		aHTML[++h] = '<table class="interfaceMainAccount" cellspacing=0 cellpadding=0>' +
				'<tr id="trInterfaceMainPayrollEmployeeRow1" class="interfaceMainRow1">' +
				'<td id="tdInterfaceMainPayrollEmployeeColumn1" style="width:125px;font-size:0.875em;padding-right:10px;">' +
				'</td>' +
				'<td id="tdInterfaceMainPayrollEmployeeColumn2" class="interfaceMainColumn2">' +
				'</td>' +
				'</tr>' +
				'</table>';			
		
		$('#divInterfaceMainEmployee').html(aHTML.join(''));
		
		if (oResponse == undefined)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'FINANCIAL_PAYROLL_EMPLOYEE_SEARCH';
			oSearch.addField('contactpersontext,employmentstartdate,statustext,employee.contactperson.firstname,employee.contactperson.surname');
			oSearch.addFilter('status', 'EQUAL_TO', '2')
			oSearch.rows = 50;
			oSearch.sort('employee.contactperson.firstname', 'asc');
			oSearch.getResults(function(data) {interfaceFinancialPayrollEmployees(oParam, data)});
		}
		else
		{
			var aHTML = [];
			var h = -1;
		
			if (oResponse.data.rows.length == 0)
			{
				aHTML[++h] = '<table id="tableInterfaceFinancialHomeMostLikely">';
				aHTML[++h] = '<tr class="trInterfaceFinancialHomeMostLikelyNothing">';
				aHTML[++h] = '<td class="tdInterfaceFinancialHomeMostLikelyNothing">No employees set up.</td>';
				aHTML[++h] = '</tr>';
				aHTML[++h] = '</table>';
			}
			else
			{
				aHTML[++h] = '<table id="tableEmployees" cellpadding=6>';
				aHTML[++h] = '<tbody>'
			
				var oRows = oResponse.data.rows;
			
				$(oRows).each(function() 
				{
					aHTML[++h] = interfaceFinancialPayrollEmployeesRow(this);
				});
			
				aHTML[++h] = '</tbody></table>';
			}
		
			ns1blankspacePaginationList(
			{
				type: 'JSON',
				xhtmlElementID: 'tdInterfaceMainPayrollEmployeeColumn1',
				xhtmlContext: 'PayrollEmployees',
				xhtml: aHTML.join(''),
				showMore: (oResponse.morerows == "true"),
				more: oResponse.moreid,
				rows: 50,
				functionShowRow: interfaceFinancialPayrollEmployeesRow,
				functionOpen: undefined,
				functionNewPage: ''
		   	}); 
			
			$('.employee').click(function() {
				$('#tableEmployees td.Highlight').removeClass('Highlight');
				$('#' + event.target.id).addClass('Highlight');
				var aID = (event.target.id).split('-');
				$.extend(true, oParam, {step: 2, employee: parseInt(aID[1])});
				interfaceFinancialPayrollEmployees(oParam);
			});	
		}
	}

	if (iStep == 11)
	{
		var aHTML = [];
		var h = -1;

		aHTML[++h] = '<table style="width:100%">' +
						'<tr>' +
						'<td id="tdInterfaceMainPayrollEmployeeDetailsEditColumn1" style="font-size:0.875em;padding-right:15px;>' +
						ns1blankspace.xhtml.loading +
						'</td>' +
						'<td id="tdInterfaceMainPayrollEmployeeDetailsEditColumn2" class="interfaceMainColumn2" style="width:75px;font-size:0.875em;">' +
						'<span style="width:60px;font-size:0.75em;" id="spanPayrollEmployeeEdit_options_save">Save</span>' +
						'</td>' +
						'</tr></table>';				
			
		$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(aHTML.join(''));

		$('#spanPayrollEmployeeEdit_options_save').button(
		{
			text: "Save"
		})
		.click(function() 
		{
			ns1blankspaceStatusWorking();
		});	

	}	
	
	//EMPLOYEE DETAILS
	if (iStep == 2)
	{
		if (oResponse == undefined)
		{
			$('#tdInterfaceMainPayrollEmployeeColumn2').html(ns1blankspace.xhtml.loadingSmall);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'FINANCIAL_PAYROLL_EMPLOYEE_SEARCH';
			oSearch.addField('*');
			oSearch.addFilter('id', 'EQUAL_TO', iEmployee);
			oSearch.getResults(function(data) {interfaceFinancialPayrollEmployees(oParam, data)});
		}
		else
		{
			ns1blankspace.financial.employee = oResponse.data.rows[0];
		
			var aHTML = [];
			var h = -1;
			
			aHTML[++h] = '<table class="interfaceMainPayrollEmployeeDetails" cellspacing=0 cellpadding=0>' +
					'<tr id="trInterfaceMainPayrollEmployeeDetailsRow1" class="interfaceMainRow1">' +
					'<td id="tdInterfaceMainPayrollEmployeeDetailsColumn1" style="width:50px;font-size:0.875em;padding-right:10px;">' +
					'</td>' +
					'<td id="tdInterfaceMainPayrollEmployeeDetailsColumn2" class="interfaceMainColumn2">' +
					'</td>' +
					'</tr>' +
					'</table>';			
		
			$('#tdInterfaceMainPayrollEmployeeColumn2').html(aHTML.join(''));
			
			var aHTML = [];
			var h = -1;

			aHTML[++h] = '<table id="tableEmployeeDetails" cellpadding=6>';

			aHTML[++h] = '<tr class="interfaceMainRow">';		
			aHTML[++h] = '<td id="interfaceFinancialEmployee_details-11" class="interfaceMainRow interfaceMainRowSelect employeedetails">' +
									'Details</td>';
			aHTML[++h] = '</tr>';

			aHTML[++h] = '<tr class="interfaceMainRow">';
			aHTML[++h] = '<td id="interfaceFinancialEmployee_details-12" class="interfaceMainRow interfaceMainRowSelect employeedetails">' +
									'Payroll</td>';																					
			aHTML[++h] = '</tr>';

			aHTML[++h] = '<tr class="interfaceMainRow">';
			aHTML[++h] = '<td id="interfaceFinancialEmployee_details-13" class="interfaceMainRow interfaceMainRowSelect employeedetails">' +
									'Pay Rates</td>';																					
			aHTML[++h] = '</tr>';

			aHTML[++h] = '<tr class="interfaceMainRow">';
			aHTML[++h] = '<td id="interfaceFinancialEmployee_details-14" class="interfaceMainRow interfaceMainRowSelect employeedetails">' +
									'Bank&nbsp;Accounts</td>';																					
			aHTML[++h] = '</tr>';


			aHTML[++h] = '<tr class="interfaceMainRow">';
			aHTML[++h] = '<td id="interfaceFinancialEmployee_details-15" class="interfaceMainRow interfaceMainRowSelect employeedetails">' +
									'Superannuation</td>';																					
			aHTML[++h] = '</tr>';


			aHTML[++h] = '<tr class="interfaceMainRow">';
			aHTML[++h] = '<td id="interfaceFinancialEmployee_details-16" class="interfaceMainRow interfaceMainRowSelect employeedetails">' +
									'Role</td>';																					
			aHTML[++h] = '</tr>';

			aHTML[++h] = '<tr class="interfaceMainRow">';
			aHTML[++h] = '<td id="interfaceFinancialEmployee_details-17" class="interfaceMainRow interfaceMainRowSelect employeedetails">' +
									'Induction</td>';																					
			aHTML[++h] = '</tr>';

			aHTML[++h] = '</table>';

			$('#tdInterfaceMainPayrollEmployeeDetailsColumn1').html(aHTML.join(''));
		
			$('.employeedetails').click(function()
			{
				$('#tableEmployeeDetails td.Highlight').removeClass('Highlight');
				$('#' + event.target.id).addClass('Highlight');
				var aID = (event.target.id).split('-');
				$.extend(true, oParam, {step: parseInt(aID[1]), stepAction: 1});
				interfaceFinancialPayrollEmployees(oParam);
			});

			$('#interfaceFinancialEmployee_details-11').addClass('Highlight');
			$.extend(true, oParam, {step: 11});
			interfaceFinancialPayrollEmployees(oParam);
		}
	}
	
	if (iStep == 11)
	{
		var aHTML = [];
		var h = -1;
			
		aHTML[++h] = '<table id="tableInterfaceMainEmployeeDetails" class="interfaceMain">';
		
		aHTML[++h] = '<tr id="trInterfaceMainEmployeeDetailsStatus" class="interfaceMain">' +
						'<td id="tdInterfaceMainEmployeeDetailsStatus" class="interfaceMain">' +
						'Status' +
						'</td></tr>' +
						'<tr id="trInterfaceMainEmployeeDetailsStatus" class="interfaceMainText">' +
						'<td id="tdInterfaceMainEmployeeDetailsStatusValue" class="interfaceMainRadio">' +
						'<input type="radio" id="radioStatus1" name="radioStatus" value="1"/>Proposed' +
						'<br /><input type="radio" id="radioStatus2" name="radioStatus" value="2"/>Active' +
						'<br /><input type="radio" id="radioStatus3" name="radioStatus" value="3"/>In-active' +
						'</td></tr>';
		
		aHTML[++h] = '<tr id="trInterfaceMainEmployeeDetailsNotes" class="interfaceMain">' +
						'<td id="tdInterfaceMainEmployeeDetailsNotes" class="interfaceMain">' +
						'Notes' +
						'</td></tr>' +
						'<tr id="trInterfaceMainEmployeeDetailsNotesValue" class="interfaceMainTextMulti">' +
						'<td id="tdInterfaceMainEmployeeDetailsNotesValue" class="interfaceMainTextMulti">' +
						'<textarea rows="10" cols="35" id="inputInterfaceMainDetailsNotes" class="inputInterfaceMainTextMultiSmall"></textarea>' +
						'</td></tr>';
		
		aHTML[++h] = '</table>';					
			
		$('#tdInterfaceMainPayrollEmployeeDetailsEditColumn1').html(aHTML.join(''));

		if (ns1blankspace.financial.employee != undefined)
		{
			$('[name="radioStatus"][value="' + ns1blankspace.financial.employee["employee.status"] + '"]').attr('checked', true);
			$('#inputInterfaceMainEmployeeDetailsNotes').val(ns1blankspace.financial.employee["employee.description"]);
		}
		else
		{
			$('[name="radioStatus"][value="1"]').attr('checked', true);
		}
	}
	
	if (iStep == 12)
	{
		var aHTML = [];
		var h = -1;
			
		aHTML[++h] = '<table id="tableInterfaceMainEmployeeDetails" class="interfaceMain">';
		
		aHTML[++h] = '<tr><td class="interfaceMain">Frequency</td></tr>' +
						'<tr><td class="interfaceMainRadio">' +
						'<input type="radio" id="radioFrequency1" name="radioFrequency" value="1"/>Weekly' +
						'<br /><input type="radio" id="radioFrequency2" name="radioFrequency" value="2"/>Fortnightly' +
						'<br /><input type="radio" id="radioFrequency3" name="radioFrequency" value="3"/>Monthly' +
						'<br /><input type="radio" id="radioFrequency4" name="radioFrequency" value="4"/>Bi/Semi Monthly' +
						'</td></tr>';
		
		aHTML[++h] = '<tr><td class="interfaceMain">Allowance Amount</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsAllowance" class="inputInterfaceMainText">' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Allowance Description</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsAllowanceDescription" class="inputInterfaceMainText">' +
						'</td></tr>';				
		
		aHTML[++h] = '<tr><td class="interfaceMain">Standard Deduction Amount</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsDeduction" class="inputInterfaceMainText">' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Standard Deduction Description</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsDeductionDescription" class="inputInterfaceMainText">' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Medicare</td></tr>' +
						'<tr><td class="interfaceMainRadio">' +
						'<input type="radio" id="radioMedicare1" name="radioMedicare" value="1"/>Pay Medicare' +
						'<br /><input type="radio" id="radioMedicare2" name="radioMedicare" value="2"/>Full Exemption' +
						'<br /><input type="radio" id="radioMedicare3" name="radioMedicare" value="3"/>Half Exemption' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Tax File Number</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsTaxNumber" class="inputInterfaceMainText">' +
						'</td></tr>';

		aHTML[++h] = '</table>';					
			
		$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(aHTML.join(''));

		if (ns1blankspace.financial.employee != undefined)
		{
			$('[name="radioMedicare"][value="' + ns1blankspace.financial.employee["employee.status"] + '"]').attr('checked', true);
			$('[name="radioFrequency"][value="' + ns1blankspace.financial.employee["employee.payfrequency"] + '"]').attr('checked', true);
			$('#inputInterfaceMainDetailsAllowanceDescription').val(ns1blankspace.financial.employee["employee.allowancedescription"]);
		}
		else
		{
			$('[name="radioMedicare"][value="1"]').attr('checked', true);
		}
	}

	//SUPERANNUATION
	if (iStep == 15)
	{
		var aHTML = [];
		var h = -1;
			
		aHTML[++h] = '<table id="tableInterfaceMainEmployeeDetails" class="interfaceMain">';
		
		aHTML[++h] = '<tr><td class="interfaceMain">Fund Name</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsEmployerFundName" class="inputInterfaceMainText">' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Fund Member Number</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsEmployerFundMemberName" class="inputInterfaceMainText">' +
						'</td></tr>';				
		
		aHTML[++h] = '<tr><td class="interfaceMain">Superannuation %</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsEmployerSuperannuationRate" class="inputInterfaceMainText">' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Salary Sacrifice Contribution</td></tr>' +
						'<tr><td class="interfaceMainRadio">' +
						'<input type="radio" id="radioEmployerType1" name="radioEmployer" value="1"/>Dollar amount per pay' +
						'<br /><input type="radio" id="radioEmployerType2" name="radioEmployer" value="2"/>Percentage of pay' +
						'</td></tr>';				

		aHTML[++h] = '</table>';					
			
		$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(aHTML.join(''));

		if (ns1blankspace.financial.employee != undefined)
		{
			$('[name="radioEmployerType1"][value="' + ns1blankspace.financial.employee["employee.status"] + '"]').attr('checked', true);
			$('#inputInterfaceMainDetailsAllowanceDescription').val(ns1blankspace.financial.employee["employee.allowancedescription"]);
		}
		else
		{
			$('[name="radioMedicare"][value="1"]').attr('checked', true);
		}
	}	

	//ROLE
	if (iStep == 16)
	{
		var aHTML = [];
		var h = -1;
			
		aHTML[++h] = '<table id="tableInterfaceMainEmployeeDetails" class="interfaceMain">';
		
		aHTML[++h] = '<tr><td class="interfaceMain">Description</td></tr>' +
						'<tr><td class="interfaceMainTextMulti">' +
						'<textarea rows="10" cols="35" id="inputInterfaceMainDetailsJobDetails" class="inputInterfaceMainTextMultiSmall"></textarea>' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Reports To</td></tr>' +
						'<tr><td class="interfaceMainTextMulti">' +
						'<textarea rows="10" cols="35" id="inputInterfaceMainDetailsInternalRelationships" class="inputInterfaceMainTextMultiSmall"></textarea>' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">KPIs</td></tr>' +
						'<tr><td class="interfaceMainTextMulti">' +
						'<textarea rows="10" cols="35" id="inputInterfaceMainDetailsKPI" class="inputInterfaceMainTextMultiSmall"></textarea>' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Responsibilities</td></tr>' +
						'<tr><td class="interfaceMainTextMulti">' +
						'<textarea rows="10" cols="35" id="inputInterfaceMainDetailsResponsibilities" class="inputInterfaceMainTextMultiSmall"></textarea>' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Tasks</td></tr>' +
						'<tr><td class="interfaceMainTextMulti">' +
						'<textarea rows="10" cols="35" id="inputInterfaceMainDetailsTasks" class="inputInterfaceMainTextMultiSmall"></textarea>' +
						'</td></tr>';

		aHTML[++h] = '</table>';					
			
		$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(aHTML.join(''));

		if (ns1blankspace.financial.employee != undefined)
		{
			$('#inputInterfaceMainDetailsJobDetails').val(ns1blankspace.financial.employee["employee.jobdetails"]);
		}
	}	

	//INDUCTION
	if (iStep == 17)
	{
		var aHTML = [];
		var h = -1;
			
		aHTML[++h] = '<table id="tableInterfaceMainEmployeeDetails" class="interfaceMain">';
		
		aHTML[++h] = '<tr><td class="interfaceMain">Induction Date</td></tr>' +
						'<tr><td class="interfaceMainText">' +
						'<input id="inputInterfaceMainDetailsInductionDate" class="inputInterfaceMainDate">' +
						'</td></tr>';

		aHTML[++h] = '<tr><td class="interfaceMain">Workers Compensation Insurance Completed</td></tr>' +
						'<tr><td class="interfaceMainRadio">' +
						'<input type="radio" id="radioWorkersCompensationY" name="radioWorkersCompensation" value="Y"/>Yes' +
						'<br /><input type="radio" id="radioWorkersCompensationN" name="radioWorkersCompensation" value="N"/>No' +
						'</td></tr>';				

		aHTML[++h] = '</table>';					
			
		$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(aHTML.join(''));

		if (ns1blankspace.financial.employee != undefined)
		{
			$('[name="radioWorkersCompensation"][value="' + ns1blankspace.financial.employee["employee.workerscompform"] + '"]').attr('checked', true);
		}
		else
		{
			$('[name="radioMedicare"][value="1"]').attr('checked', true);
		}
	}	

	//PAYRATES
	if (iStep == 13)
	{
		if (iStepAction == 4)
		{
			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/financial/?method=FINANCIAL_PAYROLL_EMPLOYEE_PAYRATE_MANAGE',
				data: 'remove=1&id=' + aXHTMLElementID[1],
				dataType: 'json',
				success: function(data)
				{
					if (data.status == 'OK')
					{
						$('#' + sXHTMLElementID).parent().parent().fadeOut(500);
						$.extend(true, oParam, {stepAction: 1});
						interfaceFinancialPayrollEmployees(oParam);
						ns1blankspaceStatus('Removed');
					}
					else
					{
						ns1blankspaceError(data.error.errornotes);
					}
				}
			});

		}
		else
		{
			if ((iStepAction == 1 || iStepAction == 2) && (oResponse == undefined))
			{
				$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(ns1blankspace.xhtml.loadingSmall);

				var oSearch = new AdvancedSearch();
				oSearch.method = 'FINANCIAL_PAYROLL_EMPLOYEE_PAYRATE_SEARCH';		
				
				if (iStepAction == 1)
				{	
					oSearch.addField('employmenttype,employmenttypetext,enddate,notes,rate,startdate');
					oSearch.addFilter('employee', 'EQUAL_TO', iEmployee)
					oSearch.rows = 50;
					oSearch.sort('startdate', 'desc');
				}
				else
				{
					oSearch.addField('employmenttype,employmenttypetext,enddate,notes,rate,startdate');
					oSearch.addFilter('id', 'EQUAL_TO', aXHTMLElementID[1]);
					oParam.id = aXHTMLElementID[1];
				}	

				oSearch.getResults(function(data){interfaceFinancialPayrollEmployees(oParam, data)});
			}
			else
			{
				var aHTML = [];
				var h = -1;
			
				aHTML[++h] = '<table style="width:100%">' +
								'<tr>' +
								'<td id="tdInterfaceMainPayrollEmployeeDetailsPayRateColumn1" style="font-size:0.875em;>' +
								ns1blankspace.xhtml.loading +
								'</td>' +
								'<td id="tdInterfaceMainPayrollEmployeeDetailsPayRateColumn2" class="interfaceMainColumn2" style="width:75px;">' +
								'</td>' +
								'</tr></table>';				
			
				$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(aHTML.join(''));
			
				var aHTML = [];
				var h = -1;

				if (iStepAction == 1)
				{
					$('#tdInterfaceMainPayrollEmployeeDetailsPayRateColumn2').html('<span id="spanPayrollEmployee_options_add" class="interfaceMainRowOptionsAdd" style="font-size:0.75em;">Add</span>');

					$('#spanPayrollEmployee_options_add').button(
					{
						text: "Add"
					})
					.click(function() {
						$.extend(true, oParam, {stepAction: 3, xhtmlElementID: "", id: ""});
						interfaceFinancialPayrollEmployees(oParam);
					})
					.css('font-size', '0.75em');
				
					if (oResponse.data.rows.length == 0)
					{
						aHTML[++h] = '<table>';
						aHTML[++h] = '<tr>';
						aHTML[++h] = '<td class="interfaceMainRowNothing">No pay rates.</td>';
						aHTML[++h] = '</tr>';
						aHTML[++h] = '</table>';

						$('#ttdInterfaceMainPayrollEmployeeDetailsPayRateColumn1').html(aHTML.join(''));
					}
					else
					{			
						aHTML[++h] = '<table border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
						aHTML[++h] = '<tbody>'
				
						aHTML[++h] = '<tr class="interfaceMainCaption">';
						aHTML[++h] = '<td class="interfaceMainCaption">Start Date</td>';
						aHTML[++h] = '<td class="interfaceMainCaption">End Date</td>';
						aHTML[++h] = '<td class="interfaceMainCaption" style="text-align:right;">Rate</td>';
						aHTML[++h] = '<td class="interfaceMainCaption">&nbsp;</td>';
						aHTML[++h] = '</tr>';

						$(oResponse.data.rows).each(function() 
						{
							aHTML[++h] = '<tr class="interfaceMainRow">';
							
							aHTML[++h] = '<td id="interfacePayrollEmployeeDetailsPayRate_StartDate-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect payrate">' +
													this.startdate + '</td>';
												
							aHTML[++h] = '<td id="interfacePayrollEmployeeDetailsPayRate_EndDate-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect payrate">' +
													this.enddate + '</td>';
									
							aHTML[++h] = '<td id="interfacePayrollEmployeeDetailsPayRate_EndDate-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect payrate" style="text-align:right;">' +
													this.rate + '</td>';
																								
							aHTML[++h] = '<td style="width:30px;text-align:right;" class="interfaceMainRow">';
							
							aHTML[++h] = '<span id="spanSubscription_options_remove-' + this.id + '" class="interfaceMainRowOptionsRemove"></span>';
								
							aHTML[++h] = '</td>';				
																			
							aHTML[++h] = '</tr>'
						});
						
						aHTML[++h] = '</tbody></table>';
					}
					
					$('#tdInterfaceMainPayrollEmployeeDetailsPayRateColumn1').html(aHTML.join(''));

					$('.interfaceMainRowOptionsRemove').button(
					{
						text: false,
						icons: {
							primary: "ui-icon-close"
						}
					})
					.click(function() {
						$.extend(true, oParam, {stepAction: 4, xhtmlElementID: this.id});
						interfaceFinancialPayrollEmployees(oParam);
					})
					.css('width', '15px')
					.css('height', '17px');

					$('.payrate').click(function() {
						$.extend(true, oParam, {stepAction: 2, xhtmlElementID: event.target.id});
						interfaceFinancialPayrollEmployees(oParam);
					})
				}
				else
				{
					aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMain" style="padding-right:15px;">';
		
					aHTML[++h] = '<tr><td class="interfaceMain">Start Date</td></tr>' +
									'<tr><td>' +
									'<input id="inputInterfacePayrollEmployeeDetailsPayRateStartDate" class="inputInterfaceMainDate">' +
									'</td></tr>';	

					aHTML[++h] = '<tr><td class="interfaceMain">End Date</td></tr>' +
									'<tr><td>' +
									'<input id="inputInterfacePayrollEmployeeDetailsPayRateEndDate" class="inputInterfaceMainDate">' +
									'</td></tr>';

					aHTML[++h] = '<tr><td class="interfaceMain">Rate Amount</td></tr>' +
									'<tr><td>' +
									'<input id="inputInterfacePayrollEmployeeDetailsPayRateAmount" class="inputInterfaceMainText">' +
									'</td></tr>';				

					aHTML[++h] = '</table>';

					$('#tdInterfaceMainPayrollEmployeeDetailsPayRateColumn1').html(aHTML.join(''));

					$('input.inputInterfaceMainDate').datepicker({dateFormat: 'dd M yy'});

					var aHTML = [];
					var h = -1;

					aHTML[++h] = '<table class="interfaceMain" style="font-size:0.875em">' +
									'<tr iclass="interfaceMainAction">' +
									'<td class="interfaceMainAction">' +
									'<span style="width:70px;" id="spanPayrollEmployee_options_save">Save</span>' +
									'</td></tr>' +
									'<tr class="interfaceMainAction">' +
									'<td class="interfaceMainAction">' +
									'<span style="width:70px;" id="spanPayrollEmployee_options_cancel">Cancel</span>' +
									'</td></tr>' +
									'</table>';	

					$('#tdInterfaceMainPayrollEmployeeDetailsPayRateColumn2').html(aHTML.join(''));

					$('#spanPayrollEmployee_options_save').button(
					{
						text: "Save"
					})
					.click(function() 
					{
						ns1blankspaceStatusWorking();

						var sData = 'id=' + ns1blankspace.util.fs(iID);
						if (iID == '')
						{
							sData += '&employee=' + ns1blankspace.util.fs(iEmployee);
						}	
						sData += '&startdate=' + ns1blankspace.util.fs($('#inputInterfacePayrollEmployeeDetailsPayRateStartDate').val());
						sData += '&enddate=' + ns1blankspace.util.fs($('#inputInterfacePayrollEmployeeDetailsPayRateEndDate').val());
						sData += '&rate=' + ns1blankspace.util.fs($('#inputInterfacePayrollEmployeeDetailsPayRateAmount').val());

						$.ajax(
						{
							type: 'POST',
							url: '/ondemand/financial/?method=FINANCIAL_PAYROLL_EMPLOYEE_PAYRATE_MANAGE',
							data: sData,
							dataType: 'json',
							success: function(data) {
								if (data.status == "OK")
								{
									ns1blankspaceStatus('Saved');
									$.extend(true, oParam, {stepAction: 1, id: ''});
									interfaceFinancialPayrollEmployees(oParam);
								}
								else
								{
									ns1blankspaceError(data.error.errornotes);
								}
							}
						});
					});

					$('#spanPayrollEmployee_options_cancel').button(
					{
						text: "Cancel"
					})
					.click(function() 
					{
						$.extend(true, oParam, {stepAction: 1});
						interfaceFinancialPayrollEmployees(oParam);
					});
					
					if (oResponse != undefined)
					{	
						if (oResponse.data.rows.length != 0)
						{
							var oObjectContext = oResponse.data.rows[0];
							
							$('#inputInterfacePayrollEmployeeDetailsPayRateStartDate').val(oObjectContext.startdate);
							$('#inputInterfacePayrollEmployeeDetailsPayRateEndDate').val(oObjectContext.enddate);
							$('#inputInterfacePayrollEmployeeDetailsPayRateAmount').val(oObjectContext.rate);
						}
						else
						{
						}
					}	

				}
			}
		}			
	}
	
	//BANK ACCOUNTS
	if (iStep == 14)
	{
		if (iStepAction == 4)
		{	
			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/financial/?method=FINANCIAL_PAYROLL_EMPLOYEE_BANK_ACCOUNT_MANAGE',
				data: 'remove=1&id=' + aXHTMLElementID[1],
				dataType: 'json',
				success: function(data)
				{
					if (data.status == 'OK')
					{
						$('#' + sXHTMLElementID).parent().parent().fadeOut(500);
						$.extend(true, oParam, {stepAction: 1});
						interfaceFinancialPayrollEmployees(oParam);
						ns1blankspaceStatus('Removed');
					}
					else
					{
						ns1blankspaceError(data.error.errornotes);
					}
				}
			});

		}
		else
		{
			if ((iStepAction == 1 || iStepAction == 2) && (oResponse == undefined))
			{
				$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(ns1blankspace.xhtml.loadingSmall);

				var oSearch = new AdvancedSearch();
				oSearch.method = 'FINANCIAL_PAYROLL_EMPLOYEE_BANK_ACCOUNT_SEARCH';		
				
				if (iStepAction == 1)
				{	
					oSearch.addField('accountname,accountnumber,bsb,percentage');
					oSearch.addFilter('employee', 'EQUAL_TO', iEmployee)
					oSearch.rows = 50;
					oSearch.sort('accountname', 'asc');
				}
				else
				{
					oSearch.addField('accountname,accountnumber,bsb,percentage');
					oSearch.addFilter('id', 'EQUAL_TO', aXHTMLElementID[1])
					oParam.id = aXHTMLElementID[1];
				}	

				oSearch.getResults(function(data){interfaceFinancialPayrollEmployees(oParam, data)});
			}
			else
			{
				var aHTML = [];
				var h = -1;
			
				aHTML[++h] = '<table style="width:100%">' +
								'<tr>' +
								'<td id="tdInterfaceMainPayrollEmployeeDetailsBankAccountColumn1" style="font-size:0.875em;>' +
								ns1blankspace.xhtml.loading +
								'</td>' +
								'<td id="tdInterfaceMainPayrollEmployeeDetailsBankAccountColumn2" class="interfaceMainColumn2" style="width:75px;">' +
								'</td>' +
								'</tr></table>';				
			
				$('#tdInterfaceMainPayrollEmployeeDetailsColumn2').html(aHTML.join(''));
			
				var aHTML = [];
				var h = -1;

				if (iStepAction == 1)
				{
					$('#tdInterfaceMainPayrollEmployeeDetailsBankAccountColumn2').html('<span id="spanPayrollEmployee_options_add" class="interfaceMainRowOptionsAdd" style="font-size:0.75em;">Add</span>');

					$('#spanPayrollEmployee_options_add').button(
					{
						text: "Add"
					})
					.click(function() {
						$.extend(true, oParam, {stepAction: 3, xhtmlElementID: "", id: ""});
						interfaceFinancialPayrollEmployees(oParam);
					})
					.css('font-size', '0.75em');
				
					if (oResponse.data.rows.length == 0)
					{
						aHTML[++h] = '<table>';
						aHTML[++h] = '<tr>';
						aHTML[++h] = '<td class="interfaceMainRowNothing">No bank accounts.</td>';
						aHTML[++h] = '</tr>';
						aHTML[++h] = '</table>';

						$('#ttdInterfaceMainPayrollEmployeeDetailsPayRateColumn1').html(aHTML.join(''));
					}
					else
					{			
						aHTML[++h] = '<table border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
						aHTML[++h] = '<tbody>'
				
						aHTML[++h] = '<tr class="interfaceMainCaption">';
						aHTML[++h] = '<td class="interfaceMainCaption">Name</td>';
						aHTML[++h] = '<td class="interfaceMainCaption">BSB</td>';
						aHTML[++h] = '<td class="interfaceMainCaption">Number</td>';
						aHTML[++h] = '<td class="interfaceMainCaption" style="text-align:right;">%</td>';
						aHTML[++h] = '<td class="interfaceMainCaption">&nbsp;</td>';
						aHTML[++h] = '</tr>';

						$(oResponse.data.rows).each(function() 
						{
							aHTML[++h] = '<tr class="interfaceMainRow">';
							
							aHTML[++h] = '<td id="interfacePayrollEmployeeDetailsBankAccount_Name-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect bankaccount">' +
													this.accountname + '</td>';
												
							aHTML[++h] = '<td id="interfacePayrollEmployeeDetailsBankAccount_BSB-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect bankaccount">' +
													this.bsb + '</td>';
									
							aHTML[++h] = '<td id="interfacePayrollEmployeeDetailsBankAccount_Number-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect bankaccount">' +
													this.accountnumber + '</td>';

							aHTML[++h] = '<td id="interfacePayrollEmployeeDetailsBankAccount_Percentage-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect payrate" style="text-align:right;">' +
													this.percentage + '</td>';						
																								
							aHTML[++h] = '<td style="width:30px;text-align:right;" class="interfaceMainRow">';
							
							aHTML[++h] = '<span id="spanBankAccount_options_remove-' + this.id + '" class="interfaceMainRowOptionsRemove"></span>';
								
							aHTML[++h] = '</td>';				
																			
							aHTML[++h] = '</tr>'
						});
						
						aHTML[++h] = '</tbody></table>';
					}
					
					$('#tdInterfaceMainPayrollEmployeeDetailsBankAccountColumn1').html(aHTML.join(''));

					$('.interfaceMainRowOptionsRemove').button(
					{
						text: false,
						icons: {
							primary: "ui-icon-close"
						}
					})
					.click(function() {
						$.extend(true, oParam, {stepAction: 4, xhtmlElementID: this.id});
						interfaceFinancialPayrollEmployees(oParam);
					})
					.css('width', '15px')
					.css('height', '17px');

					$('.bankaccount').click(function() {
						$.extend(true, oParam, {stepAction: 2, xhtmlElementID: event.target.id});
						interfaceFinancialPayrollEmployees(oParam);
					})
				}
				else
				{
					aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMain" style="padding-right:15px;">';
		
					aHTML[++h] = '<tr><td class="interfaceMain">Account Name</td></tr>' +
									'<tr><td>' +
									'<input id="inputInterfacePayrollEmployeeDetailsBankAccountName" class="inputInterfaceMainText">' +
									'</td></tr>';	

					aHTML[++h] = '<tr><td class="interfaceMain">BSB</td></tr>' +
									'<tr><td>' +
									'<input id="inputInterfacePayrollEmployeeDetailsBankAccountBSB" class="inputInterfaceMainText">' +
									'</td></tr>';

					aHTML[++h] = '<tr><td class="interfaceMain">Account Number</td></tr>' +
									'<tr><td>' +
									'<input id="inputInterfacePayrollEmployeeDetailsBankAccountNumber" class="inputInterfaceMainText">' +
									'</td></tr>';				

					aHTML[++h] = '<tr><td class="interfaceMain">% Split</td></tr>' +
									'<tr><td>' +
									'<input id="inputInterfacePayrollEmployeeDetailsBankAccountPercentage" class="inputInterfaceMainText">' +
									'</td></tr>';

					aHTML[++h] = '</table>';

					$('#tdInterfaceMainPayrollEmployeeDetailsBankAccountColumn1').html(aHTML.join(''));

					$('input.inputInterfaceMainDate').datepicker({dateFormat: 'dd M yy'});

					var aHTML = [];
					var h = -1;

					aHTML[++h] = '<table class="interfaceMain" style="font-size:0.875em">' +
									'<tr iclass="interfaceMainAction">' +
									'<td class="interfaceMainAction">' +
									'<span style="width:70px;" id="spanPayrollEmployee_options_save">Save</span>' +
									'</td></tr>' +
									'<tr class="interfaceMainAction">' +
									'<td class="interfaceMainAction">' +
									'<span style="width:70px;" id="spanPayrollEmployee_options_cancel">Cancel</span>' +
									'</td></tr>' +
									'</table>';	

					$('#tdInterfaceMainPayrollEmployeeDetailsBankAccountColumn2').html(aHTML.join(''));

					$('#spanPayrollEmployee_options_save').button(
					{
						text: "Save"
					})
					.click(function() 
					{
						ns1blankspaceStatusWorking();

						var sData = 'id=' + ns1blankspace.util.fs(iID);
						if (iID == '')
						{
							sData += '&employee=' + ns1blankspace.util.fs(iEmployee);
						}	
						sData += '&accountname=' + ns1blankspace.util.fs($('#inputInterfacePayrollEmployeeDetailsBankAccountName').val());
						sData += '&bsb=' + ns1blankspace.util.fs($('#inputInterfacePayrollEmployeeDetailsBankAccountBSB').val());
						sData += '&accountnumber=' + ns1blankspace.util.fs($('#inputInterfacePayrollEmployeeDetailsBankAccountNumber').val());
						sData += '&percentage=' + ns1blankspace.util.fs($('#inputInterfacePayrollEmployeeDetailsBankAccountPercentage').val());

						$.ajax(
						{
							type: 'POST',
							url: '/ondemand/financial/?method=FINANCIAL_PAYROLL_EMPLOYEE_BANK_ACCOUNT_MANAGE',
							data: sData,
							dataType: 'json',
							success: function(data) {
								if (data.status == "OK")
								{
									ns1blankspaceStatus('Saved');
									$.extend(true, oParam, {stepAction: 1, id: ''});
									interfaceFinancialPayrollEmployees(oParam);
								}
								else
								{
									ns1blankspaceError(data.error.errornotes);
								}
							}
						});
					});

					$('#spanPayrollEmployee_options_cancel').button(
					{
						text: "Cancel"
					})
					.click(function() 
					{
						$.extend(true, oParam, {stepAction: 1});
						interfaceFinancialPayrollEmployees(oParam);
					});
					
					if (oResponse != undefined)
					{	
						if (oResponse.data.rows.length != 0)
						{
							var oObjectContext = oResponse.data.rows[0];
							
							$('#inputInterfacePayrollEmployeeDetailsBankAccountName').val(oObjectContext.accountname);
							$('#inputInterfacePayrollEmployeeDetailsBankAccountBSB').val(oObjectContext.bsb);
							$('#inputInterfacePayrollEmployeeDetailsBankAccountNumber').val(oObjectContext.accountnumber);
							$('#inputInterfacePayrollEmployeeDetailsBankAccountPercentage').val(oObjectContext.percentage);
						}
						else
						{
						}
					}	

				}
			}
		}			
	}
}

function interfaceFinancialPayrollEmployeesRow(oRow)
{
	var aHTML = [];
	var h = -1;

	if (oRow.contactpersontext != '')
	{
		aHTML[++h] = '<tr class="interfaceMainRow">';
				
		aHTML[++h] = '<td id="interfaceFinancialHomeMostLikely_Contact-' + oRow.id + '" class="interfaceMainRow interfaceMainRowSelect employee">' +
								oRow["employee.contactperson.firstname"] + ' ' + oRow["employee.contactperson.surname"] + '</td>';
	
		aHTML[++h] = '</tr>'
	}

	return aHTML.join('');
}

function interfaceFinancialPayrollPays(oParam, oResponse)
{
	var iStep = 1;
	var iEmployee;
	var iPay;
	var sEmployeeText;

	if (oParam != undefined)
	{
		if (oParam.step != undefined) {iStep = oParam.step};
		if (oParam.employee != undefined) {iEmployee = oParam.employee};
		if (oParam.pay != undefined) {iPay = oParam.pay};
		if (oParam.employeeText != undefined) {sEmployeeText = oParam.employeeText};
	}
	else
	{
		oParam = {};
	}	

	//PAY RECORDS
	if (iStep == 1)
	{
		var aHTML = [];
		var h = -1;	
			
		if (oResponse == undefined)
		{
						
			aHTML[++h] = '<table class="interfaceMain">' +
						'<tr class="interfaceMainRow1">' +
						'<td id="tdInterfaceMainFinancialPayrollColumnList" style="width:150px;padding-right:5px;font-size:0.875em;" class="interfaceMainColumnX">' +
						ns1blankspace.xhtml.loading + '</td>' +
						'<td id="tdInterfaceMainFinancialPayrollColumnListAction" class="interfaceMainColumn2">' +
						'</td>' +
						'</tr>' +
						'</table>';			
					
			$('#divInterfaceMainPays').html(aHTML.join(''));
		
			$('#tdInterfaceMainFinancialPayrollColumnList').html(ns1blankspace.xhtml.loadingSmall);
			$('#tdInterfaceMainFinancialPayrollColumnItem').html("");

			if (ns1blankspace.objectContextData.status == "1")
			{
				var aHTML = [];
				var h = -1;	
				
				aHTML[++h] = '<table id="tableInterfaceMainFinancialPayrollColumnAction" class="interfaceMainColumn2">';
				aHTML[++h] = '<tr><td id="tdInterfaceMainFinancialPayrollAdd" class="interfaceMainAction">' +
								'<span id="spanInterfaceMainFinancialPayrollAdd">Add</span>' +
								'</td></tr>';
												
				aHTML[++h] = '</table>';					
				
				$('#tdInterfaceMainFinancialPayrollColumnListAction').html(aHTML.join(''));
			
				$('#spanInterfaceMainFinancialPayrollAdd').button(
				{
					label: "Add"
				})
				.click(function()
				{
					$.extend(true, oParam, {step: 4, xhtmlElementID: ""});
					interfaceSetupFinancialPayrollPays(oParam);
				})
			}

			var oSearch = new AdvancedSearch();
			oSearch.method = 'FINANCIAL_PAYROLL_PAY_RECORD_SEARCH';
			oSearch.addField('grosssalary,payrecord.employee.contactpersontext');
			oSearch.addFilter('period', 'EQUAL_TO', ns1blankspace.objectContext)
			oSearch.rows = 200;
			oSearch.sort('payrecord.employee.contactpersontext', 'asc');
			oSearch.getResults(function(data) {interfaceFinancialPayrollPays(oParam, data)})	
		}
		else
		{
			var aHTML = [];
			var h = -1;
	
			aHTML[++h] = '<table id="tablePays" border="0" cellspacing="0" cellpadding="0" class="interfaceMain" style="width:100%;">';
			aHTML[++h] = '<tbody>';
		
			if (oResponse.data.rows.length == 0)
			{
				aHTML[++h] = '<tr class="interfaceMainCaption">' +
								'<td class="interfaceMainRowNothing">No pays.</td></tr>';
				aHTML[++h] = '</tbody></table>';
			}
			else
			{		
				$(oResponse.data.rows).each(function()
				{
					aHTML[++h] = '<tr class="interfaceMainRow">';
					
					aHTML[++h] = '<td id="interfaceFinancialPay_Name-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect pay"' +
											' data-employeeText="' + this["payrecord.employee.contactpersontext"] + '">' +
											this["payrecord.employee.contactpersontext"] + '</td>';
										
					aHTML[++h] = '<td style="width:30px;text-align:right;" class="interfaceMainRow">';
					aHTML[++h] = '<span id="spanFinancialPay_options_remove-' + this.id + '" class="interfaceMainRowOptionsRemove"></span>';
					aHTML[++h] = '</td>';					
																								
					aHTML[++h] = '</tr>'
				});
			
				aHTML[++h] = '</tbody></table>';
			}
		
			$('#tdInterfaceMainFinancialPayrollColumnList').html(aHTML.join(''));

			if (ns1blankspace.objectContextData.status == "1")
			{
				$('.interfaceMainRowOptionsRemove').button(
				{
					text: false,
				 	icons: {primary: "ui-icon-close"}
				})
				.click(function() {
					$.extend(true, oParam, {step: 5, xhtmlElementID: event.target.id});
					///interfaceSetupFinancialPayrollPays(this.id)
				})
				.css('width', '15px')
				.css('height', '20px')
			}

			$('td.pay').click(function()
			{
				$('#tablePays td.Highlight').removeClass('Highlight');
				$('#' + event.target.id).addClass('Highlight');
				var aXHTMLElementID = (event.target.id).split('-');
				var sData = $('#' + event.target.id).attr('data-employeeText');
				$.extend(true, oParam, {step: 2, pay: aXHTMLElementID[1], employeeText: sData});
				interfaceFinancialPayrollPays(oParam);
			})
		}
	}

	//PAY RECORD DETAILS
	else if (iStep == 2)
	{	
		if (oResponse == undefined)
		{
			var aHTML = [];
			var h = -1;

			aHTML[++h] = '<table class="interfaceMain">' +
						'<tr class="interfaceMainRow1">' +
						'<td id="tdInterfaceMainFinancialPayrollColumnPay" style="width:200px;padding-right:5px;font-size:0.875em;" class="interfaceMainColumn2x">' +
						ns1blankspace.xhtml.loadingSmall + '</td>' +
						'<td id="tdInterfaceMainFinancialPayrollColumnItem" style="width:200px;padding-right:15px;font-size:0.75em;" class="interfaceMainColumn2">' +
						'</td>' +
						'<td id="tdInterfaceMainFinancialPayrollColumnAction" class="interfaceMainColumn2">' +
						'</td>' +
						'</tr>' +
						'</table>';	

			$('#tdInterfaceMainFinancialPayrollColumnListAction').html(aHTML.join(''));
			
			var aHTML = [];
			var h = -1;
		
			if (ns1blankspace.objectContextData.status == "2") 
			{
				aHTML[++h] = '<div id="divInterfaceMainFinancialPayrollColumnItemType" style="width: 200px;margin-bottom:3px;">';
				aHTML[++h] = '<input style="width: 95px;" type="radio" id="interfaceMainFinancialPayrollColumnItemType-3" name="radioType" checked="checked" /><label for="interfaceMainFinancialPayrollColumnItemType-3" style="width: 95px;">Time</label>';
				aHTML[++h] = '<input style="width: 95px;"  type="radio" id="interfaceMainFinancialPayrollColumnItemType-5" name="radioType" /><label for="interfaceMainFinancialPayrollColumnItemType-5" style="width: 95px;">Expenses</label>';
				aHTML[++h] = '</div>';
			}

			aHTML[++h] = '<div id="divInterfaceMainFinancialPayrollColumnItem" style="width: 200px;margin-bottom:3px;"></div>';

			$('#tdInterfaceMainFinancialPayrollColumnItem').html(aHTML.join(''));

			$('#divInterfaceMainFinancialPayrollColumnItemType').buttonset().css('font-size', '0.75em');

			$('#divInterfaceMainFinancialPayrollColumnItemType :radio').click(function()
			{
				var aID = (event.target.id).split('-');
				$.extend(true, oParam, {step: aID[1]});
				interfaceFinancialPayrollPays(oParam);
			});

			var aHTML = [];
			var h = -1;	
			
			aHTML[++h] = '<table id="tableInterfaceMainFinancialPayrollColumnAction" class="interfaceMainColumn2">';

			if (ns1blankspace.objectContextData.status == "1")
			{
				aHTML[++h] = '<tr><td id="tdInterfaceMainFinancialPayrollAdd" class="interfaceMainAction">' +
							'<span id="spanInterfaceMainFinancialPayrollAdd">Add</span>' +
							'</td></tr>';
			}
			else
			{
				aHTML[++h] = '<tr class="interfaceMainCaption">' +
								'<td class="interfaceMainRowNothing">This pay has been completed.</td></tr>';
			}				
											
			aHTML[++h] = '</table>';					
			
			$('#tdInterfaceMainFinancialPayrollColumnAction').html(aHTML.join(''));
		
			$('#spanInterfaceMainFinancialPayrollAdd').button(
			{
				label: "Add"
			})
			.click(function()
			{
				$.extend(true, oParam, {step: 4, xhtmlElementID: ""});
				interfaceFinancialPayrollPays(oParam);
			})

			var oSearch = new AdvancedSearch();
			oSearch.method = 'FINANCIAL_PAYROLL_PAY_RECORD_SEARCH';
			oSearch.addFilter('id', 'EQUAL_TO', iPay)
			oSearch.addField('grosssalary,calculations,netsalary,deductions,superannuation,calculations,taxbeforerebate');
			oSearch.rows = 1;
			oSearch.getResults(function(data) {interfaceFinancialPayrollPays(oParam, data)})	
		}
		else
		{

			ns1blankspace.objectContextData.pay = oResponse.data.rows[0];

			$.extend(true, oParam, {step: 3});
			interfaceFinancialPayrollPays(oParam);

			var aHTML = [];
			var h = -1;
	
			aHTML[++h] = '<table border="0" cellspacing="0" cellpadding="0" class="interfaceMain" style="padding-right:10px;">';
			aHTML[++h] = '<tbody>';
		
			if (oResponse.data.rows.length != 0)
			{
				var oRow = oResponse.data.rows[0];

				aHTML[++h] = '<tr><td class="interfaceMainRow interfaceMainCaption">Gross</td>' +
								'<td class="interfaceMainRow" style="text-align:right;">' +
								oRow["grosssalary"] +
								'</td></tr>';

				aHTML[++h] = '<tr><td class="interfaceMainRow interfaceMainCaption">Tax</td>' +
								'<td class="interfaceMainRow" style="text-align:right;">' +
								oRow["taxbeforerebate"] +
								'</td></tr>';

				aHTML[++h] = '<tr><td class="interfaceMainRow interfaceMainCaption">Superannuation</td>' +
								'<td class="interfaceMainRow" style="text-align:right;">' +
								oRow["superannuation"] +
								'</td></tr>';

				aHTML[++h] = '<tr><td class="interfaceMainRow interfaceMainCaption">Net</td>' +
								'<td class="interfaceMainRow" style="text-align:right;">' +
								oRow["netsalary"] +
								'</td></tr>';
								
				aHTML[++h] = '<tr><td class="interfaceMainRow interfaceMainCaption">Deductions</td>' +
								'<td class="interfaceMainRow" style="text-align:right;">' +
								oRow["deductions"] +
								'</td></tr>';								

				aHTML[++h] = '<tr><td colspan=2 class="interfaceMainCaption">Calculations</td></tr>' +
								'<tr><td style="padding-left:3px;" colspan=2 class="interfaceMainRowNothing">' +
								(oRow["calculations"]).replace(/\r\n/g, "<br />") +
								'</td></tr>';							
			}
				
			aHTML[++h] = '</tbody></table>';
		
			$('#tdInterfaceMainFinancialPayrollColumnPay').html(aHTML.join(''));
		}
	}

	//TIME
	else if (iStep == 3)
	{	
		if (oResponse == undefined)
		{
			$('#divInterfaceMainFinancialPayrollColumnItem').html(ns1blankspace.xhtml.loadingSmall);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'FINANCIAL_PAYROLL_PAY_RECORD_ITEM_SEARCH';
			oSearch.addField('type,typetext,hours');
			oSearch.addFilter('id', 'EQUAL_TO', iPay);
			oSearch.rows = 100;
			oSearch.getResults(function(data) {interfaceFinancialPayrollPays(oParam, data)})	
		}
		else
		{
			var aHTML = [];
			var h = -1;
	
			aHTML[++h] = '<table id="tableSetupFinancialFinancialAccount" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
			aHTML[++h] = '<tbody>';
		
			if (oResponse.data.rows.length == 0)
			{
				aHTML[++h] = '<tr class="interfaceMainCaption">' +
								'<td class="interfaceMainRowNothing">No times.</td></tr>';
				aHTML[++h] = '</tbody></table>';
			}
			else
			{		
				aHTML[++h] = '<tr class="interfaceMainCaption">';
				aHTML[++h] = '<td class="interfaceMainCaption">Type</td>';
				aHTML[++h] = '<td class="interfaceMainCaption" style="text-align:right;">Hours</td>';
				aHTML[++h] = '<td class="interfaceMainCaption">&nbsp;</td>';
				aHTML[++h] = '</tr>';
				
				$(oResponse.data.rows).each(function()
				{
					aHTML[++h] = '<tr class="interfaceMainRow">';
						
					aHTML[++h] = '<td id="interfaceFinancialPayPeriodItem_Type-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect payitem">' +
											this["typetext"] + '</td>';

					var cHours = parseFloat(this["hours"]);
					aHTML[++h] = '<td id="interfaceFinancialPayPeriodItem_Hours-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect payitem" style="text-align:right;">' +
											 cHours.toFixed(2) + '</td>';						
									
					aHTML[++h] = '<td style="width:30px;text-align:right;" class="interfaceMainRow">';
					aHTML[++h] = '<span id="spanFinancialPay_options_remove-' + this.id + '" class="interfaceMainRowOptionsRemove"></span>';
					aHTML[++h] = '</td>';					
																								
					aHTML[++h] = '</tr>'
				});	
			}
				
			aHTML[++h] = '</tbody></table>';
		
			$('#divInterfaceMainFinancialPayrollColumnItem').html(aHTML.join(''));

			if (ns1blankspace.objectContextData.status == "1")
			{
				$('.interfaceMainRowOptionsRemove').button(
				{
					text: false,
				 	icons: {primary: "ui-icon-close"}
				})
				.click(function() {
					$.extend(true, oParam, {step: 5, xhtmlElementID: event.target.id});
					///interfaceSetupFinancialPayrollPays(this.id)
				})
				.css('width', '15px')
				.css('height', '20px')
			}
		}
	}

	// TIME DETAILS
	else if (iStep == 4)
	{
		var sID; 
		var iType;
		var sXHTMLElementID;

		if (oParam != undefined)
		{
			if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
			if (oParam.type != undefined) {iType = oParam.type}
		}
		
		if (sXHTMLElementID != undefined)
		{
			var aXHTMLElementID = sXHTMLElementID.split('-');
			var sID = aXHTMLElementID[1];
		}	
	
		var aHTML = [];
		var h = -1;

		aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMain" style="width:200px;">';
					
		aHTML[++h] = '<tr><td class="interfaceMain">Hours</td></tr>' +
						'<tr><td>' +
						'<input id="inputInterfaceMainPayrollItemHours" class="inputInterfaceMainText">' +
						'</td></tr>';
		
		aHTML[++h] = '<tr><td id="tdInterfaceMainAccountPostable" class="interfaceMain">' +
							'Type' +
							'</td></tr>' +
							'<tr><td class="interfaceMainRadio">' +
							'<table id="tableItemType" style="width:180px;" cellspacing=2>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType1" name="radioItemType" value="1"/></td><td>Normal</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType2" name="radioItemType" value="2"/></td><td>Sick Leave</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType3" name="radioItemType" value="3"/></td><td>Annual Leave</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType4" name="radioItemType" value="4"/></td><td>Long Service Leave</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType5" name="radioItemType" value="5"/></td><td>Compensation</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType6" name="radioItemType" value="6"/></td><td>Overtime (Superannuation Exempt)</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType8" name="radioItemType" value="8"/></td><td>Allowance</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType9" name="radioItemType" value="9"/></td><td>Deduction</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType10" name="radioItemType" value="10"/></td><td>Tax Adjustment</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType11" name="radioItemType" value="11"/></td><td>Leave Loading</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType12" name="radioItemType" value="12"/></td><td>Leave Without Pay</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType14" name="radioItemType" value="14"/></td><td>Bonus</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType15" name="radioItemType" value="15"/></td><td>Rostered Day Off / Time in Lieu</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType16" name="radioItemType" value="16"/></td><td>Salary Sacrifice Superannuation</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType17" name="radioItemType" value="17"/></td><td>Additional Employee Superannuation</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType18" name="radioItemType" value="18"/></td><td>Public Holiday</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType19" name="radioItemType" value="19"/></td><td>Commission</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType20" name="radioItemType" value="20"/></td><td>Termination - Unused Annual Leave</td></tr>' +	
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType21" name="radioItemType" value="21"/></td><td>Termination - Unused Long Service Leave</td></tr>' +
							'<tr><td style="width:15px;"><input type="radio" id="radioItemType22" name="radioItemType" value="22"/></td><td>Paid Parental Leave (Superannuation Exempt)</td></tr>' +
							'</table>' + 
						'</td></tr>';

		aHTML[++h] = '</table>';					
		
		$('#tdInterfaceMainFinancialPayrollColumnItem').html(aHTML.join(''));
		
		$('#inputInterfaceMainPayrollItemHours').focus();

		var aHTML = [];
		var h = -1;
	
		aHTML[++h] = '<table id="tableInterfaceMainColumn2" class="interfaceMain" style="font-size:0.875em">';
				
		aHTML[++h] = '<tr id="trInterfaceMainAccountAddSave" class="interfaceMainAction">' +
						'<td id="tdInterfaceMainAccountAddSave" class="interfaceMainAction">' +
						'<span style="width:70px;" id="spanInterfaceMainAccountEditSave">Save</span>' +
						'</td></tr>';
						
		aHTML[++h] = '<tr id="trInterfaceMainBankAccountEditCancel" class="interfaceMainAction">' +
							'<td id="tdInterfaceMainBankAccountEditCancel" class="interfaceMainAction">' +
							'<span style="width:70px;" id="spanInterfaceMainAccountEditCancel">Cancel</span>' +
							'</td></tr>';
											
		aHTML[++h] = '</table>';					
			
		$('#tdInterfaceMainFinancialPayrollColumnAction').html(aHTML.join(''));
		
		$('#spanInterfaceMainAccountEditSave').button(
		{
			text: "Save"
		})
		.click(function() 
		{
			ns1blankspaceStatusWorking();

			var sData = 'type=' + iType;
			sData += '&id=' + ns1blankspace.util.fs(sID);
			sData += '&title=' + ns1blankspace.util.fs($('#inputInterfaceMainAccountAddTitle').val());
			sData += '&parentaccount=' + ns1blankspace.util.fs($('#inputInterfaceMainAccountParentAccount').attr("data-id"));
			sData += '&postable=' + ns1blankspace.util.fs($('input[name="radioPostable"]:checked').val());

			var oAdd =
					{
						"items": [], 
						"title": $('#inputInterfaceMainAccountAddTitle').val(),
						"parentaccount": $('#inputInterfaceMainAccountParentAccount').attr("data-id"),
						"postable": $('input[name="radioPostable"]:checked').val()
					}

			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/setup/setup.asp?method=SETUP_FINANCIAL_ACCOUNT_MANAGE',
				data: sData,
				dataType: 'json',
				success: function(data) {
					if (data.status == "OK")
					{
						ns1blankspaceStatus('Saved');

						$.extend(true, oAdd, {id: data.id});
						
						var bNew = true;

						$(ns1blankspace.financial.accounts).each(function(i) 
						{
							if (this.id == data.id) {ns1blankspace.financial.accounts[i] = oAdd; bNew = false}
						});

						if (bNew) {(ns1blankspace.financial.accounts).unshift(oAdd)}

						$.extend(true, oParam, {step: 2});
						interfaceFinancialPayrollPays(oParam)
					}
					else
					{
						ns1blankspaceError(data.error.errornotes);
					}
				}
			});
		});

		$('#spanInterfaceMainAccountEditCancel').button(
		{
			text: "Cancel"
		})
		.click(function() 
		{
			$.extend(true, oParam, {step: 2});
			interfaceSetupFinancialAccount(oParam);
		});

		if (sID != undefined)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'SETUP_FINANCIAL_ACCOUNT_SEARCH';
			oSearch.addField('title,description,parentaccount,parentaccounttext,postable');
			oSearch.addFilter('id', 'EQUAL_TO', sID);
			oSearch.getResults(function(data) {
					$.extend(true, oParam, {step: 5});
					interfaceSetupFinancialAccount(oParam, data)
					});
		}
		else
		{
			$('[name="radioItemType"][value="1"]').attr('checked', true);
		}
	}

	//EXPENSES
	else if (iStep == 5)
	{	
		if (oResponse == undefined)
		{
			$('#divInterfaceMainFinancialPayrollColumnItem').html(ns1blankspace.xhtml.loadingSmall);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'FINANCIAL_EXPENSE_SEARCH';
			oSearch.addField('description,amount');
			oSearch.addFilter('object', 'EQUAL_TO', '37');
			oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContextData.id);
			oSearch.addFilter('contactpersonpaidto', 'EQUAL_TO', ns1blankspace.objectContextData.pay["contactperson"]);
			oSearch.getResults(function(data) {interfaceFinancialPayrollPays(oParam, data)})	
		}
		else
		{
			var aHTML = [];
			var h = -1;
	
			aHTML[++h] = '<table id="tableSetupFinancialFinancialAccount" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
			aHTML[++h] = '<tbody>';
		
			if (oResponse.data.rows.length == 0)
			{
				aHTML[++h] = '<tr class="interfaceMainCaption">' +
								'<td class="ingterfaceMainRowNothing">No expenses.</td></tr>';
				aHTML[++h] = '</tbody></table>';
			}
			else
			{		
				aHTML[++h] = '<tr class="interfaceMainCaption">';
				aHTML[++h] = '<td class="interfaceMainCaption">Description</td>';
				aHTML[++h] = '<td class="interfaceMainCaption" style="text-align:right;">Amount</td>';
				aHTML[++h] = '<td class="interfaceMainCaption">&nbsp;</td>';
				aHTML[++h] = '</tr>';
				
				$(oResponse.data.rows).each(function()
				{
					aHTML[++h] = '<tr class="interfaceMainRow">';
						
					aHTML[++h] = '<td id="interfaceFinancialPayPeriodExpenseItem_Description-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect expenseitem">' +
											this["description"] + '</td>';

					aHTML[++h] = '<td id="interfaceFinancialPayPeriodExpenseItem_Amount-' + this.id + '" class="interfaceMainRow interfaceMainRowSelect expenseitem" style="text-align:right;">' +
											 parseFloat(this["amount"]).toFixed(2) + '</td>';						
									
					aHTML[++h] = '<td style="width:30px;text-align:right;" class="interfaceMainRow">';
					aHTML[++h] = '<span id="spanFinancialPayExpenseItem_options_remove-' + this.id + '" class="interfaceMainRowOptionsRemove"></span>';
					aHTML[++h] = '</td>';					
																								
					aHTML[++h] = '</tr>'
				});	
			}
				
			aHTML[++h] = '</tbody></table>';
		
			$('#divInterfaceMainFinancialPayrollColumnItem').html(aHTML.join(''));

			if (ns1blankspace.objectContextData.status == "1")
			{
				$('.interfaceMainRowOptionsRemove').button(
				{
					text: false,
				 	icons: {primary: "ui-icon-close"}
				})
				.click(function() {
					$.extend(true, oParam, {step: 5, xhtmlElementID: event.target.id});
					///interfaceSetupFinancialPayrollPays(this.id)
				})
				.css('width', '15px')
				.css('height', '20px')
			}
		}
	}

	else if (iStep == 6)
	{
		if (oResponse.data.rows.length != 0)
		{
			var oObjectContext = oResponse.data.rows[0];
			$('#inputInterfaceMainAccountAddTitle').val((oObjectContext.title).formatXHTML());
			$('#inputInterfaceMainAccountParentAccount').val(($.grep(ns1blankspace.financial.accounts, function (a) { return a.id == oObjectContext.parentaccount; })[0].title).formatXHTML());
			$('#inputInterfaceMainAccountParentAccount').attr('data-id', oObjectContext.parentaccount);
			$('[name="radioPostable"][value="' + oObjectContext.postable + '"]').attr('checked', true);
		}
	}	
}
