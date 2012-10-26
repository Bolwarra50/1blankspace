/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
ns1blankspace.stucture.data = 
{
	init: 		function interfaceStructureDataMasterViewport(oParam)
				{
					ns1blankspace.objectName = 'Stucture Data';
					ns1blankspace.objectContext = -1;
					ns1blankspace.object = 41;
					ns1blankspace.objectContextData = undefined;
					
					var bShowHome = true;
					var bNew = false;
					
					if (oParam != undefined)
					{
						if (oParam.showHome != undefined) {bShowHome = oParam.showHome}
						if (oParam.showNew != undefined) {bNew = oParam.showNew}
						if (bNew) {interfaceStructureDataNew()};
					}	
					
					if (bShowHome)
					{
						ns1blankspaceViewportDestination({
							newDestination: 'interfaceStructureDataMasterViewport({showHome: true});',
							move: false
							})		
					}
					
					ns1blankspaceReset();		
							
					$('#divns1blankspaceViewportControlSet').button(
					{
						label: "Structure Data"
					});
					
					$('#inputns1blankspaceViewportControlSearch').keyup(function(event)
					{
						if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
				        ns1blankspace.timer.delayCurrent = setTimeout("interfaceStructureDataSearch('inputns1blankspaceViewportControlSearch')", ns1blankspace.option.typingWait);
					});
					
					$('#spanns1blankspaceViewportControlSearch').click(function(event)
					{
						interfaceStructureDataSearch('inputns1blankspaceViewportControlSearch');
					});
					
					$('#spanns1blankspaceViewportControlSearchOptions').click(function(event)
					{
						interfaceStructureDataSearchOptions();
					});
					
					$('#spanns1blankspaceViewportControlNew').click(function(event)
					{
						interfaceStructureDataNew();
					})
					
					$('#spanns1blankspaceViewportControlNewOptions').click(function(event)
					{
						interfaceStructureDataNewOptions();
					});
					
					$('#spanns1blankspaceViewportControlAction').click(function(event)
					{
						interfaceStructureDataSave();
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

						ns1blankspaceViewportActionShow(this, aHTML.join(''), "interfaceStructureDataActionOptionsBind()");
					});
					
					$('#spanns1blankspaceViewportControlActionOptions').button({disabled: true});
						
					$('#spanns1blankspaceViewportControlSetup').click(function(event)
					{
						interfaceStructureDataSetup();
					});
					
					$('#spanns1blankspaceViewportControlSetupOptions').click(function(event)
					{
						interfaceStructureDataSetupOptions();
					});
					
					$('#spanns1blankspaceViewportControlHelp').click(function(event)
					{
						interfaceStructureDataHelp();
					});
					
					$('#spanns1blankspaceViewportControlHelpOptions').click(function(event)
					{
						interfaceStructureDataHelpOptions();
					});

					$('td.interfaceViewportMasterControlBrowse').click(function(event)
					{
						interfaceStructureDataSearch(event.target.id, {source: ns1blankspace.data.searchSource.browse});
					});
					
					$('td.interfaceViewportMasterControlBrowseAll').click(function(event)
					{
						interfaceStructureDataSearch(event.target.id, {source: ns1blankspace.data.searchSource.browse});
					});
					
					$('#inputns1blankspaceViewportControlSearch').focus();
					
					interfaceStructureDataHomeShow();	
				},

	bind:		function interfaceStructureDataActionOptionsBind()
				{
					$('#tdinterfaceActionOptionsRemove').click(function(event)
					{
						interfaceStructureDataRemove();
					});
				},

	home: 		function interfaceStructureDataHomeShow(oResponse)
				{
					if (oResponse == undefined)
					{
						var aHTML = [];
						var h = -1;
									
						aHTML[++h] = '<table id="tableInterfaceMainSummary" class="interfaceMain">';
						aHTML[++h] = '<tr id="trInterfaceMainSummaryRow1" class="interfaceMainRow1">' +
									'<td id="tdInterfaceWebsiteHomeMostLikely" class="interfaceMainColumn1Large">' +
										'</td>' +
										'<td id="tdInterfaceMainSummaryColumn2Action" style="width:175px;">' +
										'</td>' +
										'</tr>';
						aHTML[++h] = '</table>';		
										
						$('#divInterfaceMain').html(aHTML.join(''));
						
						var aHTML = [];
						var h = -1;
						
						aHTML[++h] = '<table id="tableInterfaceMainColumn2" cellspacing=0>';
														
						aHTML[++h] = '</td></tr></table>';					

						$('#tdInterfaceMainSummaryColumn2Action').html(aHTML.join(''));
						
						var aHTML = [];
						var h = -1;
									
						aHTML[++h] = '<table>';
						aHTML[++h] = '<tr>' +
										'<td id="ns1blankspaceViewportSetupLarge" class="ns1blankspaceViewportImageLarge">' +
										'&nbsp;' + 
										'</td>' +
										'</tr>';
						aHTML[++h] = '</table>';		
						
						$('#divInterfaceViewportControl').html(aHTML.join(''));	
						
						$('#divns1blankspaceViewportControlOptions').hide(ns1blankspace.option.hideSpeedOptions);
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'STRUCTURE_DATA_SEARCH';
						oSearch.addField('reference');
						oSearch.rows = 10;
						oSearch.sort('modifieddate', 'desc');
						oSearch.getResults(interfaceStructureDataHomeShow)
					}
					else
					{
						var aHTML = [];
						var h = -1;
					
						if (oResponse.data.rows.length == 0)
						{
							aHTML[++h] = '<table id="tableInterfaceWebsiteHomeMostLikely">';
							aHTML[++h] = '<tr class="trInterfaceWebsiteHomeMostLikelyNothing">';
							aHTML[++h] = '<td class="tdInterfaceWebsiteHomeMostLikelyNothing">Click New to create a structure data.</td>';
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
							interfaceStructureDataSearch(event.target.id, {source: 1});
						});
					}
				},

	search: 	{
					send: 		function interfaceStructureDataSearch(sXHTMLElementId, oParam)
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
										
										giSetupContext = sSearchContext;
										ns1blankspace.objectContext = sSearchContext;
										var sParam = 'method=DECISION_DATA_SEARCH&id=' + giSetupContext;
										
										$.ajax(
										{
											type: 'GET',
											url: '/ondemand/decision/?' + sParam,
											dataType: 'json',
											success: function(data) {interfaceStructureDataShow(oParam, data)}
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
											
											var sParam = 'method=DECISION_DATA_SEARCH&quicksearch=' + sSearchText;

											$.ajax(
											{
												type: 'GET',
												url: '/ondemand/decision/?' + sParam,
												dataType: 'json',
												success: function(data) {interfaceStructureDataSearchShow(oParam, data)}
											});
											
										}
									};	
								},

					process:	function interfaceStructureDataSearchShow(oParam, oResponse)
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
											interfaceStructureDataSearch(event.target.id, 1);
										});
									}	
											
								}
				},			

	layout: 	function interfaceStructureDataViewport()
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
						
						aHTML[++h] = '<tr><td>&nbsp;</td></tr>';
					
						aHTML[++h] = '<tr id="trInterfaceViewportControl" class="interfaceViewportControl">' +
										'<td id="tdInterfaceViewportControlElement" class="interfaceViewportControl">Elements</td>' +
										'</tr>';	
					}
					
					aHTML[++h] = '</table>';					
								
					$('#divInterfaceViewportControl').html(aHTML.join(''));
					
					var aHTML = [];
					var h = -1;

					aHTML[++h] = '<div id="divInterfaceMainSummary" class="divInterfaceViewportMain"></div>';
					aHTML[++h] = '<div id="divInterfaceMainDetails" class="divInterfaceViewportMain"></div>';
					aHTML[++h] = '<div id="divInterfaceMainElement" class="divInterfaceViewportMain"></div>';
						
					$('#divInterfaceMain').html(aHTML.join(''));
						
					$('#tdInterfaceViewportControlSummary').click(function(event)
					{
						ns1blankspaceMainViewportShow("#divInterfaceMainSummary");
						interfaceStructureDataSummary();
					});
					
					$('#tdInterfaceViewportControlDetails').click(function(event)
					{
						ns1blankspaceMainViewportShow("#divInterfaceMainDetails");
						interfaceStructureDataDetails();
					});
					
					$('#tdInterfaceViewportControlElement').click(function(event)
					{
						ns1blankspaceMainViewportShow("#divInterfaceMainElement", true);
						interfaceStructureDataElements();
					});
				},

	show: 		function interfaceStructureDataShow(oParam, oResponse)
				{

					$('#divns1blankspaceViewportControlOptions').hide(ns1blankspace.option.hideSpeedOptions);
					interfaceStructureDataViewport();
					
					var aHTML = [];
					var h = -1;
					
					if (oResponse.data.rows.length == 0)
					{
						ns1blankspace.objectContextData = undefined;
						
						aHTML[++h] = '<table><tbody><tr><td valign="top">Sorry can\'t find this stuctural data.</td></tr>';
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
										'<td id="tdInterfaceMainSummaryColumn2" class="interfaceMainColumn2x">' +
										'</td>' +
										'</tr>';
						aHTML[++h] = '</table>';					
						
						$('#divInterfaceMainSummary').html(aHTML.join(''));
						
						ns1blankspaceViewportDestination({
							newDestination: 'interfaceStructureDataMasterViewport({showHome: false});interfaceStructureDataSearch("-' + ns1blankspace.objectContext + '")',
							move: false
							})
						
						ns1blankspaceObjectViewportHistory({functionDefault: 'interfaceStructureDataSummary()'})

						$('#divInterfaceViewportControlContext').html(ns1blankspace.objectContextData.title);
						$('#spanns1blankspaceViewportControlAction').button({disabled: false});
						$('#spanns1blankspaceViewportControlActionOptions').button({disabled: false});	
					}	
				},	
		
	summary: 	function interfaceStructureDataSummary()
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
						
						aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryStructureDataDate" class="interfaceMainSummary">Date</td></tr>' +
										'<tr><td id="tdInterfaceMainSummaryStructureDataDate" class="interfaceMainSummaryValue">' +
										ns1blankspace.objectContextData.modifieddate +
										'</td></tr>';
						
						if (ns1blankspace.objectContextData.contactbusinesstext != '')
						{			
							aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryStructureDataBusiness" class="interfaceMainSummary">Business</td></tr>' +
										'<tr><td id="tdInterfaceMainSummaryStructureDataBusiness" class="interfaceMainSummaryValue">' +
										ns1blankspace.objectContextData.contactbusinesstext +
										'</td></tr>';			
						};
						
						if (ns1blankspace.objectContextData.contactpersontext != '')
						{			
							aHTML[++h] = '<tr><td id="tdInterfaceMainSummaryStructureDataPerson" class="interfaceMainSummary">Person</td></tr>' +
										'<tr><td id="tdInterfaceMainSummaryStructureDataPerson" class="interfaceMainSummaryValue">' +
										ns1blankspace.objectContextData.contactpersontext +
										'</td></tr>';			
						};
							
						//Specifics - old coverpage fields - type and date.	
										
						aHTML[++h] = '</table>';					
						
						$('#tdInterfaceMainSummaryColumn1').html(aHTML.join(''));

						var aHTML = [];
						var h = -1;	
						
						aHTML[++h] = '<table id="tableInterfaceMainColumn2" class="interfaceMainColumn2" cellpadding=6>';
										
						aHTML[++h] = '</table>';					
						
						$('#tdInterfaceMainSummaryColumn2').html(aHTML.join(''));
					}	
				},

	details: 	function interfaceStructureDataDetails()
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
						
						aHTML[++h] = '<tr id="trInterfaceMainDetailsBusiness" class="interfaceMain">' +
										'<td id="tdInterfaceMainDetailsBusiness" class="interfaceMain">' +
										'Business' +
										'</td></tr>' +
										'<tr id="trInterfaceMainDetailsBusinesseValue" class="interfaceMainText">' +
										'<td id="tdInterfaceMainDetailsBusinessValue" class="interfaceMainText">' +
										'<input id="inputInterfaceMainDetailsBusiness" class="inputInterfaceMainText">' +
										'</td></tr>';
										
						aHTML[++h] = '<tr id="trInterfaceMainDetailsPerson" class="interfaceMain">' +
										'<td id="tdInterfaceMainDetailsPerson" class="interfaceMain">' +
										'Person' +
										'</td></tr>' +
										'<tr id="trInterfaceMainDetailsPersonValue" class="interfaceMainText">' +
										'<td id="tdInterfaceMainDetailsPersonValue" class="interfaceMainText">' +
										'<input id="inputInterfaceMainDetailsPerson" class="inputInterfaceMainText">' +
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
										'<input type="radio" id="radioStatus2" name="radioStatus" value="2"/>In Progress' +
										'<br /><input type="radio" id="radioStatus1" name="radioStatus" value="1"/>Approved' +
										'</td></tr>';
						
						aHTML[++h] = '</table>';					
						
						$('#tdInterfaceMainDetailsColumn2').html(aHTML.join(''));
						
						if (ns1blankspace.objectContextData != undefined)
						{
							$('#inputInterfaceMainDetailsTitle').val(ns1blankspace.objectContextData.title);
							$('[name="radioStatus"][value="' + ns1blankspace.objectContextData.status + '"]').attr('checked', true);
						}
						else
						{
							$('[name="radioStatus"][value="2"]').attr('checked', true);	
						}
					}	
				},

	save: 		{
					send: 		function interfaceStructureDataSave(oParam, oResponse)
								{
									if (oResponse == undefined)
									{
										var sParam = 'method=DECISION_DATA_MANAGE';
										var sData = '_=1';
										
										if (ns1blankspace.objectContext != -1)
										{
											sParam += '&id=' + ns1blankspace.objectContext	
										}	
										
										if ($('#divInterfaceMainDetails').html() != '')
										{
											sData += '&title=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsTitle').val());
											sData += '&status=' + ns1blankspace.util.fs($('input[name="radioStatus"]:checked').val());	
										};
										
										$.ajax(
										{
											type: 'POST',
											url: '/ondemand/setup/?' + sParam,
											data: sData,
											dataType: 'json',
											success: function(data) {interfaceStructureDataSave(oParam, data)}
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
												interfaceStructureDataSearch('-' + ns1blankspace.objectContext, {source: 1});
											}	
										}
										else
										{
											ns1blankspaceStatus('Could not save the StructureData!');
										}
									}
								}
				},
				
	element: 	{							
					layout:		function interfaceStructureDataElements(oParam, oResponse)
								{
									var aHTML = [];
									var h = -1;
									
									if (oResponse == undefined)
									{
										$.ajax(
										{
											type: 'GET',
											url: '/ondemand/setup/?method=SETUP_STRUCTURE_CATEGORY_SEARCH&structure=' + ns1blankspace.objectContextData.structure,
											dataType: 'json',
											success: function(data) {interfaceStructureDataElements(oParam, data)}
										});
									}
									else
									{
										if ($('#divInterfaceMainElement').attr('onDemandLoading') == '1')
										{
											$('#divInterfaceMainElement').attr('onDemandLoading', '');
										
											aHTML[++h] = '<table id="tableInterfaceMainElement" class="interfaceMain">';
											aHTML[++h] = '<tr id="trInterfaceMainElementRow1" class="interfaceMain">' +
															'<td id="tdInterfaceMainElementColumnCategory" style="width: 100px" class="interfaceMainColumn1">' +
															'</td>' +
															'<td id="tdInterfaceMainElementColumnElement" style="width: 300px" class="interfaceMainColumn2">' +
															'</td>' +
															'<td id="tdInterfaceMainElementColumnEdit" class="interfaceMainColumn2">' +
															'</td>' +
															'</tr>';
											aHTML[++h] = '</table>';					
											
											$('#divInterfaceMainElement').html(aHTML.join(''));
											
											var aHTML = [];
											var h = -1;
										
											aHTML[++h] = '<table id="tableInterfaceMainElementCategories" class="interfaceMain">';
											
											if (oResponse.data.rows.length == 0)
											{
												aHTML[++h] = '<table id="tableStructureDataCategory" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
												aHTML[++h] = '<tbody>'
												aHTML[++h] = '<tr class="interfaceMainCaption">' +
																'<td class="interfaceMainRowNothing">No categories.</td></tr>';
												aHTML[++h] = '</tbody></table>';

												$('#tdInterfaceMainElementColumn1').html(aHTML.join(''));
											
											}
											else
											{
												aHTML[++h] = '<table id="tableStructureDataCategory" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
												aHTML[++h] = '<tbody>'
												
												$.each(oResponse.data.rows, function()
												{
													aHTML[++h] = '<tr class="interfaceMainRow">';
																	
													aHTML[++h] = '<td id="tdStructureDataCategory_title-' + this.id + '" class="interfaceSearch">' +
																			this.title + '</td>';
																			
													aHTML[++h] = '</tr>';
												});
												
												aHTML[++h] = '</tbody></table>';

												$('#tdInterfaceMainElementColumnCategory').html(aHTML.join(''));
									
												$('td.interfaceSearch').click(function(event)
												{
													var sXHTMLElementId = event.target.id;
													var aId = sXHTMLElementId.split('-');
													
													interfaceStructureDataCategoryElements({xhtmlElementID: 'tdInterfaceMainElementColumnElement', category: aId[1]});
													
												});
											}	
										}
									}	
								},

					show:		function interfaceStructureDataCategoryElements(oParam, oResponse)
								{
									var iObjectContext = ns1blankspace.objectContext;
									var sXHTMLElementId = 'tdInterfaceMainElementColumnElement';
									var oOptions = {edit: true, remove: true};
									var oActions = {add: true};
									var iCategory;
									
									if (oParam != undefined)
									{
										if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
										if (oParam.xhtmlElementID != undefined) {sXHTMLElementId = oParam.xhtmlElementID}
										if (oParam.options != undefined) {oOptions = oParam.options}
										if (oParam.actions != undefined) {oActions = oParam.actions}
										if (oParam.category != undefined) {iCategory = oParam.category}
									}		
										
									if (oResponse == undefined)
									{	
										$.ajax(
										{
											type: 'GET',
											url: '/ondemand/structure/structure.asp?method=STRUCTURE_ELEMENT_DATA_VALUE_SEARCH' +
														'&data=' + ns1blankspace.objectContext + '&category=' + iCategory,
											dataType: 'json',
											success: function(data) {interfaceStructureDataCategoryElements(oParam, data)}
										});
									}
									else
									{
										var aHTML = [];
										var h = -1;
										
										if (oResponse.data.rows.length == 0)
										{
											aHTML[++h] = '<table id="tableStructureDataCategoryElements" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
											aHTML[++h] = '<tbody>'
											aHTML[++h] = '<tr class="interfaceMainCaption">' +
															'<td class="interfaceMainRowNothing">No elements</td></tr>';
											aHTML[++h] = '</tbody></table>';

											$('#' + sXHTMLElementId).html(aHTML.join(''));
										
										}
										else
										{
											aHTML[++h] = '<table id="tableStructureDataValueHeader" border="0" cellspacing="0" cellpadding="0" class="interfaceMainHeader" style="font-size:0.75em;background-color: #F8F8F8;padding:5px;">';
											aHTML[++h] = '<tbody>'
											aHTML[++h] = '<tr class="interfaceMainHeader">' +
													'<td class="interfaceMainHeaderX" id="interfaceMainHeaderRemovedEmails" style="text-align:left;">&nbsp;</td>';	
											
											aHTML[++h] = '<td class="interfaceMainHeaderX" id="tdInterfaceMainHeaderAll" style="width:15px;">';
											aHTML[++h] = '<span id="spanInterfaceMainHeaderAll" class="interfaceMainHeaderAll">All</span>';
											aHTML[++h] = '</td>';
											
											aHTML[++h] = '<td class="interfaceMainHeaderX" style="width:5px;">&nbsp;|&nbsp;</td>';
											aHTML[++h] = '<td class="interfaceMainHeaderX" id="tdInterfaceMainHeaderUnanswered" style="width:80px;">';
											aHTML[++h] = '<span id="spanInterfaceMainHeaderUnanswered" class="interfaceMainHeaderUnanswered">Unanswered</span>';
											aHTML[++h] = '</td>';
											
											aHTML[++h] = '<td class="interfaceMainHeaderX" style="width:5px;">&nbsp;|&nbsp;</td>';
											aHTML[++h] = '<td class="interfaceMainHeaderX" id="tdInterfaceMainHeaderAnswered" style="width:60px;">';
											aHTML[++h] = '<span id="spanInterfaceMainHeaderAnswered" class="interfaceMainHeaderAnswered">Answered</span>';
											aHTML[++h] = '</td>';
											
											aHTML[++h] = '</tr>';
											aHTML[++h] = '</table>';
														
											aHTML[++h] = '<tr class="interfaceMainHeader" id="trInterfaceMessagingInboxPages"><td colspan=2 id="tdInterfaceMessagingInboxPages"></td></tr>';
											aHTML[++h] = '</tbody></table>';
											aHTML[++h] = '<table id="tableStructureDataCategoryElements" border="0" cellspacing="0" cellpadding="0" class="interfaceMain">';
											aHTML[++h] = '<tbody>'

											var sClass;
											
											$.each(oResponse.data.rows, function()
											{
												aHTML[++h] = '<tr class="interfaceMainRow">';
																
												sClass = (this.text != '' || this.formatted != '') ? ' answered' : ''				
																
												aHTML[++h] = '<td id="tdStructureDataCategoryElement_title-' + this.id + '" class="interfaceMainRow' + sClass + '">' +
																		this.elementtext + '</td>';
																		
												aHTML[++h] = '<td style="width:60px;text-align:right;" class="interfaceMainRow">';
													
												if (oOptions.remove)
												{	
													aHTML[++h] = '<span id="spanStructureDataCategoryoptions_remove-' + this.id + '" class="interfaceMainRowOptionsRemove"></span>';
												};	
													
												if (oOptions.edit)
												{	
													aHTML[++h] = '<span id="spanStructureDataCategory_options_edit-' + this.id + '" class="interfaceMainRowOptionsEdit"></span>';
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
													ns1blankspaceStructureDataCategoryRemove({xhtmlElementID: this.id});
												})
												.css('width', '15px')
												.css('height', '17px')
											}
											
											if (oOptions.edit) 
											{
												$('.interfaceMainRowOptionsEdit').button( {
													text: false,
													icons: {
														primary: "ui-icon-pencil"
													}
												})
												.click(function() {
													ns1blankspaceStructureDataCategoryElementEdit({xhtmlElementID: this.id})
												})
												.css('width', '15px')
												.css('height', '17px')
											}	
										}
									}	
								},

					edit:		function ns1blankspaceStructureDataCategoryElementEdit(oParam, oResponse)
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

										aHTML[++h] = '<table style="font-size: 0.875px;">';
												
										aHTML[++h] = '<tr id="trInterfaceMainStructureDataElementAddSave">' +
														'<td>' +
														'<span id="spanInterfaceMainStructureDataCategoryElementEditSave">Save</span>' +
														'</td></tr>';
										/*
										aHTML[++h] = '<td id="tdInterfaceMainStructureDataElementAddCancel" class="interfaceMainAction">' +
														'<span id="spanInterfaceMainStructureDataCategoryElementEditCancel">Cancel</span>' +
														'</td></tr>';
										*/
														
										aHTML[++h] = '</table>';			
											
										aHTML[++h] = '<table id="tableInterfaceMainColumn1" class="interfaceMain">';
												
										aHTML[++h] = '<tr id="trInterfaceMainSetupStructureDataCategoryTitle" class="interfaceMain">' +
														'<td id="tdInterfaceMainSetupStructureDataCategoryTitle" class="interfaceMain">' +
														'Title' +
														'</td></tr>' +
														'<tr id="trInterfaceMainSetupStructureDataCategoryAddTitleValue" class="interfaceMainText">' +
														'<td id="tdInterfaceMainSetupStructureDataCategoryAddTitleValue" class="interfaceMainText">' +
														'<input id="inputInterfaceMainStructureDataCategoryAddTitle" class="inputInterfaceMainText">' +
														'</td></tr>';
										
										aHTML[++h] = '</table>';					
										
										$('#tdInterfaceMainElementColumnEdit').html(aHTML.join(''));
										
										$('#spanInterfaceMainStructureDataCategoryElementEditSave').button(
										{
											text: "Save"
										})
										.click(function() 
										{
											var sData = 'StructureData=' + ns1blankspace.objectContext;
											sData += '&id=' + ns1blankspace.util.fs(sID);
											sData += '&title=' + ns1blankspace.util.fs($('#inputInterfaceMainStructureDataCategoryAddTitle').val());
											
											$.ajax(
											{
												type: 'POST',
												url: '/ondemand/structure/structure.asp?method=STRUCTURE_DATA_VALUE_MANAGE',
												data: sData,
												dataType: 'json',
												success: function() {
													$('#tdInterfaceMainElementColumnEdit').html('');
													$('#tdStructureDataCategoryElement_title-' + sID).addClass('answered');
												}
											});
										});
										
										$('#spanInterfaceMainStructureDataCategoryElementEditCancel').button(
										{
											text: "Cancel"
										})
										.click(function() 
										{
											$('#tdInterfaceMainElementColumnEdit').html('');
										});
										
										if (sID != undefined)
										{
											$.ajax(
											{
												type: 'POST',
												url: '/ondemand/structure/structure.asp?method=STRUCTURE_DATA_VALUE_SEARCH',
												data: 'id=' + sID,
												dataType: 'json',
												success: function(data) {ns1blankspaceStructureDataCategoryElementEdit(oParam, data)}
											});
										}
										else
										{
											$('[name="radioDataType"][value="4"]').attr('checked', true);	
										}
									}
									else
									{
										if (oResponse.data.rows.length != 0)
										{
											var oObjectContext = oResponse.data.rows[0];
											$('#inputInterfaceMainSetupStructureDataElementAddTitle').val(oObjectContext.title)
											$('#inputInterfaceMainSetupStructureDataElementAddTitle').focus();
										}
									}		
								},

					remove:		function ns1blankspaceStructureDataCategoryElementRemove(oParam, oResponse)
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
										var sParam = 'method=STRUCTURE_DATA_VALUE_MANAGE&remove=1';
										var sData = 'id=' + sID;
										
										$.ajax(
										{
											type: 'POST',
											url: '/ondemand/structure/structure.asp?' + sParam,
											data: sData,
											dataType: 'json',
											success: function(data){ns1blankspaceStructureDataCategoryElementRemove(oParam, data)}
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
				},				

	new:		function interfaceStructureDataNew(oParam)
				{
					ns1blankspace.objectContextData = undefined
					ns1blankspace.objectContext = -1;
					interfaceStructureDataViewport();
					$('#spanns1blankspaceViewportControlAction').button({disabled: false});
					ns1blankspaceMainViewportShow("#divInterfaceMainDetails");
					interfaceStructureDataDetails();
				},

	debug: 		{
					search: 		function interfaceStructureTest()
									{
										var oData = {"fields":
														[
															{
																"name": "contactbusiness"
															}
														],
														"filters":
														[],
														"options":
														{
															"rf": "JSON",
															"rows": "100"
														}
													}

										$.ajax({
											url: "/rpc/structure/?method=STRUCTURE_DATA_SEARCH&advanced=1",
											type: 'POST',
											cache: false,
											dataType: 'json',
											data: JSON.stringify(oData),
											success: function(response)
											{
														
											}
										});			

									}
				}
}									