/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
ns1blankspace.financial.payment = 
{
	init: 		function interfaceFinancialPaymentMasterViewport(oParam)
				{
					ns1blankspace.financial.init();
					
					var bShowHome = true
					
					if (oParam != undefined)
					{
						if (oParam.showHome != undefined) {bShowHome = oParam.showHome}	
					}

					ns1blankspace.object = 3;
					ns1blankspace.objectParentName = 'financial';
					ns1blankspace.objectName = 'payment';
					ns1blankspace.objectContextData = undefined;
					ns1blankspace.objectContext = -1;
					ns1blankspace.viewName = 'Payments';
					
					if (bShowHome)
					{
						ns1blankspace.history.view({
							newDestination: 'ns1blankspace.financial.payment.init({showHome: true});',
							move: false
							});	
					}	
							
					ns1blankspace.app.reset();
					ns1blankspace.app.set(oParam);
				},

	refresh: 	function (oResponse)
				{
					if (oResponse == undefined)
					{
						$('#ns1blankspaceControlSubContext_amount').html(ns1blankspace.xhtml.loadingSmall);
							
						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_PAYMENT_SEARCH';
						oSearch.addField('paiddate,amount,tax');
						oSearch.rf = 'json';
						oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContext);
						
						oSearch.getResults(function(data) {ns1blankspace.financial.payment.refresh(data)});
					}
					else
					{
						var oObjectContext = oResponse.data.rows[0];
						
						ns1blankspace.objectContextData.paiddate = oObjectContext.paiddate;
						ns1blankspace.objectContextData.amount = oObjectContext.amount;
								
						$('#ns1blankspaceControlSubContext_paiddate').html(oObjectContext.paiddate);
						$('#ns1blankspaceControlSubContext_amount').html(oObjectContext.amount);
					}
				},			

	home: 		function (oResponse)
				{
					if (oResponse == undefined)
					{
						var aHTML = [];
									
						aHTML.push('<table class="ns1blankspaceMain">' + 
										'<tr class="ns1blankspaceMain">' +
										'<td id="ns1blankspaceMostLikely" class="ins1blankspaceMain">' +
										ns1blankspace.xhtml.loading +
										'</td></tr>' + 
										'</table>');					
						
						$('#ns1blankspaceMain').html(aHTML.join(''));
											
						var aHTML = [];

						aHTML.push('<table>');
						aHTML.push('<tr><td id="ns1blankspaceViewFinancialLarge" class="ns1blankspaceViewImageLarge">&nbsp;</td></tr>');				
						aHTML.push('</table>');		
						
						$('#ns1blankspaceControl').html(aHTML.join(''));	

						$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_PAYMENT_SEARCH';
						oSearch.addField('reference,description,contactbusinesspaidtotext,contactpersonpaidtotext,paiddate,amount');
						oSearch.rows = 10;
						oSearch.sort('modifieddate', 'desc');
						oSearch.getResults(ns1blankspace.financial.payment.home);
					}
					else
					{
						var aHTML = [];
				
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="ns1blankspaceMostLikely">');
							aHTML.push('<tr><td class="ns1blankspaceNothing">Click New to add a receipt.</td></tr>');
							aHTML.push('</table>');
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceMostLikely">');
							aHTML.push('<tr><td class="ns1blankspaceMain" colspan="4">MOST LIKELY</td></tr>');
							
							$.each(oResponse.data.rows, function()
							{					
								aHTML.push('<tr class="ns1blankspaceRow">');
								
								aHTML.push('<td id="ns1blankspaceMostLikely_Title-' + this.id + '" class="ns1blankspaceMostLikely" style="width:50px;">' +
														this.reference + '</td>');

								aHTML.push('<td id="ns1blankspaceMostLikely_Amount-' + this.id + '" class="ins1blankspaceMostLikelySub" style="width:50px;text-align:right;">' +
														'$' + this.amount + '</td>');
								
								aHTML.push('<td id="ns1blankspaceMostLikely_Title-' + this.id + '" class="ns1blankspaceMostLikely" style="width:50px;">' +
														this.reference + '</td>');
								
								aHTML.push('<td id="ns1blankspaceMostLikely_Amount-' + this.id + '" class="ins1blankspaceMostLikelySub" style="width:50px;text-align:right;">' +
														'$' + this.amount + '</td>');
																		
								aHTML.push('<td id="ns1blankspaceMostLikely_Date-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:90px;">' +
														this.paiddate + '</td>');
																										
								var sContact = this.contactbusinesspaidtotext;
								if (sContact == '') {sContact = this.contactpersonpaidtotext}
								
								aHTML.push('<td id="ns1blankspaceMostLikely_Contact-' + this.id + '" class="ns1blankspaceMostLikelySub">' +
														sContact + '</td>');
									
								aHTML.push('</tr>');
							});
							
							aHTML.push('</table>');
						}
						
						$('#ns1blankspaceMostLikely').html(aHTML.join(''));
					
						$('td.ns1blankspaceMostLikely').click(function(event)
						{
							 ns1blankspace.financial.payment.search.send(event.target.id, {source: 1});
						});
					}
				},

	search: 	{
					send: 		function (sXHTMLElementId, oParam)
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
										$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
										
										ns1blankspace.objectContext = sSearchContext;
										
										var oSearch = new AdvancedSearch();
										oSearch.method = 'FINANCIAL_PAYMENT_SEARCH';
										oSearch.addField('contactbusinesspaidtotext,contactbusinesspaidto,contactpersonpaidtotext,' +
																'contactpersonpaidto,projecttext,project,areatext,' +
																'area,reference,paiddate,description,amount,tax');
										oSearch.rf = 'json';
										oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
										
										oSearch.getResults(function(data) {ns1blankspace.financial.receipt.show(oParam, data)});
									}
									else
									{
										if (sSearchText == undefined)
										{
											sSearchText = $('#ns1blankspaceViewControlSearch').val();
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
											ns1blankspace.dialog.position(sElementId);
											
											var oSearch = new AdvancedSearch();
											oSearch.method = 'FINANCIAL_PAYMENT_SEARCH';
											oSearch.addField('contactbusinesspaidtotext,contactbusinesspaidto,contactpersonpaidtotext,contactpersonpaidto,' +
																'reference,paiddate,amount');
											oSearch.rf = 'json';
											oSearch.addFilter('quicksearch', 'STRING_IS_LIKE', sSearchText);
											
											oSearch.getResults(function(data) {ns1blankspace.financial.invoice.search.process(oParam, data)});	
										}
									};	
								},

					process:	function (oParam, oResponse)
								{
									var iColumn = 0;
									var	iMaximumColumns = 1;
									var aHTML = [];

									if (oResponse.data.rows.length == 0)
									{
										$(ns1blankspace.xhtml.container).hide();
									}
									else
									{		
										aHTML.push('<table class="ns1blankspaceSearchMedium">');
											
										$.each(oResponse.data.rows, function()
										{	
											iColumn = iColumn + 1;
											
											if (iColumn == 1)
											{
												aHTML.push('<tr class="ns1blankspaceSearch">');
											}
										
											aHTML.push('<td class="ns1blankspaceSearch" id="' + +
															'-' + this.id + '">' +
															this.reference +
															'</td>');
											
											if (iColumn == iMaximumColumns)
											{
												aHTML.push('</tr>');
												iColumn = 0;
											}	
										});
								    	
										aHTML.push('</table>');

										$(ns1blankspace.xhtml.container).html(aHTML.join(''));
										$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
										
										$('td.ns1blankspaceSearch').click(function(event)
										{
											$(ns1blankspace.xhtml.container).html('&nbsp;');
											$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions)
											ns1blankspace.financial.payment.search.send(event.target.id, {source: 1});
										});
									}				
											
								}
				},				

	layout: 	function ()
				{
					var aHTML = [];
					
					aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
					
					aHTML.push('<table class="ns1blankspaceControl">');
					
					if (ns1blankspace.objectContext == -1)
					{
						aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
										'Details</td></tr>');
					}
					else
					{	
						aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">"' +
										'Summary</td></tr>');
									
						aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
										'Details</td></tr>');
						
						aHTML.push('</table>');					
					
						aHTML.push('<table class="ns1blankspaceControl">');
						
						aHTML.push('<tr><td id="ns1blankspaceControlExpenses" class="ns1blankspaceControl">' +
										'Expenses</td></tr>');
													
						aHTML.push('<tr><td id="ns1blankspaceControlGL" class="ns1blankspaceControl">' +
										'GL</td></tr>');
									
						aHTML.push('</table>');					
					
						aHTML.push('<table class="ns1blankspaceControl">');
					
						aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
										'Actions</td></tr>');
									
						aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
										'Attachments</td></tr>');
					}
									
					aHTML.push('</table>');					
							
					$('#ns1blankspaceControl').html(aHTML.join(''));

					var aHTML = [];

					aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceDetails" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainExpense" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainTransaction" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
					
					$('#divInterfaceMain').html(aHTML.join(''));
					
					$('#ns1blankspaceControlSummary').click(function(event)
					{
						ns1blankspace.show({selector: '#divInterfaceMainSummary'});
						ns1blankspace.financial.invoice.summary.show();
					});

					$('#ns1blankspaceControlDetails').click(function(event)
					{
						ns1blankspace.show({selector: '#divInterfaceMainDetails'});
						ns1blankspace.financial.invoice.details();
					});
					
					$('#ns1blankspaceControlExpenses').click(function(event)
					{
						ns1blankspace.show({selector: '#divInterfaceMainExpense', refresh: true});
						ns1blankspace.financial.payment.expense();
					});
					
					$('#ns1blankspaceControlGL').click(function(event)
					{
						ns1blankspace.show({selector: '#divInterfaceMainTransaction', refresh: true});
						ns1blankspace.financial.transaction();
					});

					$('#ns1blankspaceControlActions').click(function(event)
					{
						ns1blankspace.show({selector: '#divInterfaceMainActions', refresh: true});
						ns1blankspace.actions.show({xhtmlElementID: 'divInterfaceMainActions'});
					});

					$('#ns1blankspaceControlControlAttachments').click(function(event)
					{
						ns1blankspace.show({selector: '#divInterfaceMainAttachments', refresh: true});
						ns1blankspace.attachments.show({xhtmlElementID: 'divInterfaceMainAttachments'});
					});
				},

	show:		function (oParam, oResponse)
				{
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
					ns1blankspace.financial.payment.layout();
					
					var aHTML = [];
					var h = -1;
					
					if (oResponse.data.rows.length == 0)
					{
						ns1blankspace.objectContextData = undefined;
						
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this payment.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						ns1blankspace.objectContextData = oResponse.data.rows[0];
						
						$('#ns1blankspaceViewControlAction').button({disabled: false});
								
						$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.reference +
							'<br /><span id="ns1blankspaceControlContext_paiddate" class="ns1blankspaceControlSubContext">' + ns1blankspace.objectContextData.paiddate + '</span>' +
							'<br /><span id="ns1blankspaceControlContext_amount" class="ns1blankspaceControlSubContext">$' + ns1blankspace.objectContextData.amount + '</span>');
							
						ns1blankspace.history.view({
							newDestination: 'ns1blankspace.financial.payment.init({showHome: false});ins1blankspace.financial.payment.search.send("-' + ns1blankspace.objectContext + '")',
							move: false
							})
						
						ns1blankspace.history.object({functionDefault: 'ns1blankspace.financial.payment.summary()'});
					}	
				},		
		
	summary: 	function interfaceFinancialPaymentSummary()
				{
					if (ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find the receipt.</td></tr></table>');
								
						$('#ns1blankspaceMainSummary').html(aHTML.join(''));
					}
					else
					{
						aHTML.push('<table class="ns1blankspaceMain">' +
										'<tr class="ns1blankspaceRow">' +
										'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Large"></td>' +
										'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2Action" style="width:100px;"></td>' +
										'</tr>' +
										'</table>');				
						
						$('#ns1blankspaceMainSummary').html(aHTML.join(''));
						
						var aHTML = [];

						aHTML[++h] = '<table class="ns1blankspaceColumn1">';

						if (ns1blankspace.objectContextData.amount != '')
						{
							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Phone</td></tr>' +
											'<tr><td id="ns1blankspaceSummaryAmount" class="ns1blankspaceSummary">' +
											'$' + ns1blankspace.objectContextData.amount +
											'</td></tr>');
						}	
						
						if (ns1blankspace.objectContextData.contactbusinesspaidtotext != '')
						{

							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Business</td></tr>' +
											'<tr><td id="ns1blankspaceSummaryBusiness" class="ns1blankspaceSummary">' +
											ns1blankspace.objectContextData.contactbusinesspaidtotext +
											'</td></tr>');
						}
						
						if (ns1blankspace.objectContextData.contactpersonpaidtotext != '')
						{
							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Person</td></tr>' +
											'<tr><td id="ns1blankspaceSummaryPerson" class="ns1blankspaceSummary">' +
											ns1blankspace.objectContextData.contactpersonpaidtotext +
											'</td></tr>');
						}
					
						if (ns1blankspace.objectContextData.paid == 'Y')
						{
							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Received Date</td></tr>' +
											'<tr><td id="ns1blankspaceSummaryReceivedDate" class="ns1blankspaceSummary">' +
											ns1blankspace.objectContextData.paiddate + 
											'</td></tr>');
						}
						else
						{
							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Has not been paid.</td></tr>'); 
						}	

						if (ns1blankspace.objectContextData.description != '')
						{
							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Description</td></tr>' +
											'<tr><td id="ns1blankspaceSummaryDescription" class="ns1blankspaceSummary">' +
											ns1blankspace.objectContextData.description +
											'</td></tr>');
						}
						
						aHTML.push('</table>');		

						$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));
					}	
				},

	details: 	function interfaceFinancialPaymentDetails()
				{
					var aHTML = [];
				
					if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
					{
						$('#ns1blankspaceMainDetails').attr('data-loading', '');
								
						aHTML.push('<table class="ns1blankspaceContainer">');
						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
										'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2"></td>' +
										'</tr>');
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainDetails').html(aHTML.join(''));

						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspace">');
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Reference' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsReference" class="ns1blankspaceText">' +
										'</td></tr>');			
					
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Paid Date' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceDate">' +
										'<input id="ns1blankspaceDetailsPaidDate" class="ns1blankspaceDate">' +
										'</td></tr>');		

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Business' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsPaidToBusiness" class="ns1blankspaceSelect"' +
											' data-method="CONTACT_BUSINESS_SEARCH"' +
											' data-columns="tradename">' +
										'</td></tr>');	
							
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Person' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsPaidToPerson" class="ns1blankspaceSelect"' +
											' data-method="CONTACT_PERSON_SEARCH"' +
											' data-columns="surname"' +
											' data-parent="ns1blankspaceDetailsPaidToBusiness"' +
											' data-parent-search-id="contactbusiness"' +
											' data-parent-search-text="tradename">' +
										'</td></tr>');							
								
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Amount' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsAmount" class="ns1blankspaceText">' +
										'</td></tr>');			
											
						aHTML.push('</table>');									
						
						$('#tdInterfaceMainDetailsColumn1').html(aHTML.join(''));
						
						$('input.inputInterfaceMainDate').datepicker({dateFormat: 'dd M yy'});
						
						$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
						
						$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});
						
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspace">');
							
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Description' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceTextMulti">' +
										'<input id="ns1blankspaceDetailsDescription" class="ns1blankspaceTextMulti">' +
										'</td></tr>');		
										
						aHTML.push('</table>');					
							
						$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

						if (ns1blankspace.objectContextData != undefined)
						{
							$('#ns1blankspaceDetailsReference').val(ns1blankspace.objectContextData.reference);
							$('#ns1blankspaceDetailsPaidDate').val(ns1blankspace.objectContextData.paiddate);
							$('#ns1blankspaceMainDetailsContactBusinessPaidTo').attr('data-id', ns1blankspace.objectContextData.contactbusinesspaidto);
							$('#ns1blankspaceMainDetailsContactBusinessPaidTo').val(ns1blankspace.objectContextData.contactbusinesspaidtotext);
							$('#ns1blankspaceMainDetailsContactPersonPaidTo').attr('data-id', ns1blankspace.objectContextData.contactpersonpaidto);
							$('#ns1blankspaceMainDetailsContactPersonPaidTo').val(ns1blankspace.objectContextData.contactpersonpaidtotext);	
							$('#ns1blankspaceDetailsAmount').val(ns1blankspace.objectContextData.amount);		
							$('#ns1blankspaceDetailsDescription').val(ns1blankspace.objectContextData.description);
						}
					}	
				},

	new:		function (oParam)
				{
					ns1blankspace.objectContextData = undefined
					ns1blankspace.objectContext = -1;
					ns1blankspace.financial.payment.init();
					$('#ns1blankspaceViewControlAction').button({disabled: false});
					ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
					ns1blankspace.financial.payment.details();
				},		

	save: 		{
					send: 		function (oParam, oResponse)
								{
									ns1blankspace.status.working();
										
									var sData = (ns1blankspace.objectContext == -1)?'':'id=' + ns1blankspace.objectContext;
										
									if ($('#ns1blankspaceMainDetails').html() != '')
									{
										sData += '&reference=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsReference').val());
										sData += '&paiddate=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsPaidDate').val());
										sData += '&description=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsDescription').val());
										sData += '&contactbusinesspaidfrom=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsContactBusinessPaidFrom').attr("data-id"));
										sData += '&contactpersonpaidfrom=' + ns1blankspace.util.fs($('#inputInterfaceMainDetailsContactPersonPaidFrom').attr("data-id"));
									}
									
									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.endpointURI('FINANCIAL_PAYMENT_MANAGE'),
										data: sData,
										dataType: 'json',
										success: function(data) {ns1blankspace.financial.payment.save.process(data)}
									});	
								}

					process:	function (oResponse)
								{
									if (oResponse.status == 'OK')
									{
										ns1blankspace.status.message('Saved');
										if (ns1blankspace.objectContext == -1) {var bNew = true}
										ns1blankspace.objectContext = oResponse.id;	
										
										if ($('#ns1blankspaceMainDetails').html() != '')
										{
											ns1blankspace.financial.payment.save.amount();
										}
									}
									else
									{
										ns1blankspace.status.error(oResponse.error.errornotes);
									}
								},

					amount:		function (oParam)
								{
									var iAccount = ns1blankspace.financial.settings.financialaccountcreditor;
									var cAmount = $('#inputInterfaceMainDetailsAmount').val();
									if (cAmount == '') {cAmount = 0};
									cAmount = (cAmount - ns1blankspace.objectContextData.amount)
									
									if (cAmount == 0 || iAccount == undefined)
									{
										if (iAccount == undefined) {alert('No creditor account set up.')}
									}
									else
									{
										var sData = 'object=' + ns1blankspace.util.fs(ns1blankspace.object);
										sData += '&objectcontext=' + ns1blankspace.util.fs(ns1blankspace.objectContext);
										sData += '&financialaccount=' + ns1blankspace.util.fs(iAccount);
										sData += '&amount=' + ns1blankspace.util.fs(cAmount);
										sData += '&description=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsDescription').val());
										
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('FINANCIAL_ITEM_MANAGE'),
											data: sData,
											dataType: 'json',
											success: function(oResponse)
											{
												var sData = 'object=' + ns1blankspace.object;
												sData += '&objectcontext=' + ns1blankspace.objectContext;
											
												$.ajax(
												{
													type: 'POST',
													url: ns1blankspace.util.endpointURI('FINANCIAL_ITEM_COMPLETE'),
													data: sData,
													dataType: 'json',
													success: function(oResponse)
													{
														ns1blankspace.financial.payment.refresh();
													}
												});
											}
										});
									}	
								}
				},				

	item: 		{
					show:		function (oParam, oResponse)
								{
									var iObjectContext = ns1blankspace.objectContext;
									var oOptions = {view: true, remove: true};
									var oActions = {add: true};
									
									if (oParam != undefined)
									{
										if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
										if (oParam.options != undefined) {oOptions = oParam.options}
										if (oParam.actions != undefined) {oActions = oParam.actions}
									}		
										
									if (oResponse == undefined)
									{	
										var aHTML = [];

										aHTML.push('<table class="ns1blankspaceContainer">');

										aHTML.push('<tr class="ns1blankspaceContainer">' +
														'<td id="ns1blankspaceItemColumn1" class="ns1blankspaceColumn1"></td>' +
														'<td id="ns1blankspaceItemColumn2" class="ns1blankspaceColumn2"></td>' +
														'</tr>');

										aHTML.push('</table>');					
										
										$('#ns1blankspaceMainItem').html(aHTML.join(''));
										
										if (oActions != undefined)
										{
											var aHTML = [];
											
											aHTML.push('<table class="ns1blankspaceColumn2">');
											
											if (oActions.add)
											{
												aHTML.push('<tr><td class="ns1blankspaceAction">' +
																'<span id="ns1blankspaceItemAdd">Add</span>' +
																'</td></tr>');
											}
											
											aHTML.push('</table>');					
											
											$('#ns1blankspaceItemColumn2').html(aHTML.join(''));
										
											$('#ns1blankspaceItemAdd').button(
											{
												label: "Add"
											})
											.click(function() {
												 ns1blankspace.financial.payment.item.edit(oParam);
											});
										}
										
										var oSearch = new AdvancedSearch();
										oSearch.method = 'FINANCIAL_ITEM_SEARCH';
										oSearch.addField('financialaccounttext,tax,issuedamount');
										oSearch.addFilter('object', 'EQUAL_TO', ns1blankspace.object);
										oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
										oSearch.sort('financialaccounttext', 'asc');
										
										oSearch.getResults(function(data) {ns1blankspace.financial.receipt.item.show(oParam, data)});
									}
									else
									{
										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">No items.</td></tr></table>');

											$('#ns1blankspaceItemColumn1').html(aHTML.join(''));
										}
										else
										{
											aHTML.push('<tr class="ns1blankspaceCaption">');
											aHTML.push('<td class="ns1blankspaceCaption style="width:125px;">Account</td>');
											aHTML.push('<td class="ns1blankspaceCaption" style="text-align:right;">GST</td>');
											aHTML.push('<td class="ns1blankspaceCaption" style="text-align:right;">Amount</td>');
											aHTML.push('<td class="ns1blankspaceCaption">&nbsp;</td>');
											aHTML.push('</tr>');
				
											$.each(oResponse.data.rows, function()
											{
												aHTML.push('<tr class="ns1blankspaceRow">');
																			
												aHTML.push('<td id="ns1blankspaceItem_financialaccounttext-' + oRow.id + '" class="ns1blankspaceRow">' +
																this["financialaccounttext"] + '</td>');
												
												aHTML.push('<td id="ns1blankspaceItem_tax-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
																this["tax"] + '</td>');

												aHTML.push('<td id="ns1blankspaceItem_amount-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
																this["issuedamount"] + '</td>');

												aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">');
													
												if (oOptions.remove)
												{	
													aHTML[++h] = '<span id="ns1blankspaceRowItem_options_remove-' + this.id + '" class="ns1blankspaceItemRemove"></span>';
												};	
													
												if (oOptions.view)
												{	
													aHTML[++h] = '<span id="ns1blankspaceRowItemItem_options_view-' + this.id + '" class="ns1blankspaceItemView"></span>';
												};	
													
												aHTML.push('</td></tr>');
											});
											
											aHTML.push('</table>');

											$('#ns1blankspaceItemColumn1').html(aHTML.join(''));
											
											if (oOptions.remove) 
											{
												$('.ns1blankspaceItemRemove').button( {
													text: false,
													icons: {
														primary: "ui-icon-close"
													}
												})
												.click(function() {
													ns1blankspace.financial.payment.item.remove({xhtmlElementID: this.id});
												})
												.css('width', '15px')
												.css('height', '17px')
											}
											
											if (oOptions.view) 
											{
												$('.ns1blankspaceItemView').button( {
													text: false,
													icons: {
														primary: "ui-icon-play"
													}
												})
												.click(function() {
													ns1blankspace.financial.payment.item.edit({xhtmlElementID: this.id})
												})
												.css('width', '15px')
												.css('height', '17px')
											}	
										}
									}	
								},

					add:		function (oParam, oResponse)
								{
									var iStep = 1;
									
									if (oParam != undefined)
									{
										if (oParam.step != undefined) {iStep = oParam.step}	
									}
									
									if (oResponse == undefined)
									{
										if (iStep == 1)
										{
											var aHTML = [];
											
											aHTML.push('<table class="ns1blankspace">');
													
											aHTML.push('<tr class="ns1blankspaceCaption">' +
															'<td class="ns1blankspaceCaption">' +
															'Account' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceText">' +
															'<input id="ns1blankspaceItemAccount" class="ns1blankspaceText">' +
															'</td></tr>');

											aHTML.push('<tr class="ns1blankspace">' +
															'<td class="ns1blankspace" title="Enter a code or title and click search">' +
															'<span id="ns1blankspaceItemEditSearch">Search</span>' +
															'</td></tr>');
											
											aHTML.push('</table>');

											aHTML.push('<table style="margin-top:15px;">');
											
											aHTML.push('<tr><td id="ns1blankspaceItemEditSearchResults"></td></tr>';
																			
											aHTML.push('</table>');		
											
											$('#ns1blankspaceItemColumn2').html(aHTML.join(''));

											$('#ns1blankspaceItemEditSearch').button(
											{
												label: "Search"
											})
											.click(function() {
												ns1blankspace.financial.payment.item.edit($.extend(true, oParam, {step: 2}))
											})
												
											$('#ns1blankspaceItemAccount').focus();
										}

										if (iStep == 2)
										{
											var sData = 'title=' + ns1blankspace.util.fs($('#ns1blankspaceItemAccount').val());
											
											$.ajax(
											{
												type: 'GET',
												url: ns1blankspace.util.endpointURI('SETUP_FINANCIAL_ITEM_SEARCH'),
												data: sData,
												dataType: 'json',
												success: function(data){ns1blankspace.financial.receipt.item.edit($.extend(true, oParam, {step:3}), data)}
											});
										}
									}
									else
									{
										var aHTML = [];
										var h = -1;

										if (oResponse.data.rows.length == 0)	
										{
											aHTML.push('<table class="ns1blankspace">' +
															'<tr><td class="ns1blankspaceNothing">No accounts.</td></tr>' + 
															'</table>');

											$('#ns1blankspaceItemEditSearchResults').html(aHTML.join(''));		
										}
										else
										{	
											$.each(oResponse.data.rows, function() 
											{ 
												aHTML.push('<tr class="ns1blankspaceRow">'+ 
																'<td id="ns1blankspaceItem_title-' + this.id + '" class="ns1blankspaceRow">' +
																this.title + '</td>' +
																'<td style="width:30px;text-align:right;" class="ns1blankspaceRow">' +
																'<span id="ns1blankspaceItemAccount_options_add-' + this.id + '" class="ns1blankspaceItemAccount"></span>' +
																'</td></tr>');		

											});
											
											aHTML.push('</table>');

											$('#ns1blankspaceItemEditSearchResults').html(aHTML.join(''));
											
											//binding
									}	
								}
				},				

	expense: 	function (oParam, oResponse)
				{
					var iObjectContext = ns1blankspace.objectContext;
					var oOptions = {view: true, remove: true};
					var oActions = {add: true};
					
					if (oParam != undefined)
					{
						if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
						if (oParam.options != undefined) {oOptions = oParam.options}
						if (oParam.actions != undefined) {oActions = oParam.actions}
					}		
						
					if (oResponse == undefined)
					{	
						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceContainer">');
						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceExpenseColumn1" class="ns1blankspaceColumn1"></td>' +
										'<td id="ns1blankspaceExpenseColumn2" class="ns1blankspaceColumn2" style="width: 300px;></td>' +
										'</tr>');
						aHTML.push('</table>');					
										
						$('#ns1blankspaceMainExpense').html(aHTML.join(''));
						
						if (oActions != undefined)
						{
							var aHTML = [];
															
							aHTML.push('<table class="ns1blankspaceColumn2">');
							
							if (oActions.add)
							{
								aHTML.push('<tr><td class="ns1blankspaceAction">' +
											'<span id="ns1blankspaceExpenseAdd">Add</span>' +
											'</td></tr>');
							}
							
							aHTML.push('</table>');					
							
							$('#ns1blankspaceExpenseColumn2').html(aHTML.join(''));
						
							$('#ns1blankspaceExpenseAdd').button(
							{
								label: "Add"
							})
							.click(function() {
								 ns1blankspace.financial.payment.expense.edit(oParam);
							})
						}
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_PAYMENT_EXPENSE_SEARCH';
						oSearch.addField('appliesdate,amount');
						oSearch.addFilter('payment', 'EQUAL_TO', iObjectContext);
						oSearch.sort('appliesdate', 'asc');
						oSearch.getResults(function(data) {ns1blankspace.financial.payment.expense(oParam, data)});
					}
					else
					{
						var aHTML = [];
									
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspace">' +
											'<tr><td class="ns1blankspaceNothing">No expenses.</td></tr>' + 
											'</table>');

							$('#ns1blankspaceExpenseColumn1').html(aHTML.join(''));
						}
						else
						{
							aHTML.push('<tr class="ns1blankspaceCaption">');
							aHTML.push('<td class="ns1blankspaceCaption">Date</td>');
							aHTML.push('<td class="ns1blankspaceCaption" style="text-align:right;">Amount</td>');
							aHTML.push('<td class="ns1blankspaceCaption">&nbsp;</td>');
							aHTML.push('</tr>');
							
							$.each(oResponse.data.rows, function()
							{
								aHTML.push('<tr class="ns1blankspaceRow">');
																			
								aHTML.push('<td id="ns1blankspaceReceipt_date-' + oRow.id + '" class="ns1blankspaceRow">' +
												this.appliesdate + '</td>');

								
								aHTML.push('<td id="ns1blankspaceReceipt_amount-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
												this.amount + '</td>');
		
								aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">');
									
								if (oOptions.remove)
								{	
									aHTML.push('<span id="ns1blankspaceExpense_options_remove-' + this.id + '" class="ns1blankspaceExpenseRemove"></span>');
								};	
									
								aHTML.push('</td></tr>');
							});
							
							aHTML.push('</table>');

							$('#ns1blankspaceExpenseColumn1').html(aHTML.join(''));
							
							if (oOptions.remove) 
							{
								$('.ns1blankspaceExpenseRemove').button( {
									text: false,
									icons: {
										primary: "ui-icon-close"
									}
								})
								.click(function() {
									ns1blankspace.financial.payment.expense.remove({xhtmlElementID: this.id});
								})
								.css('width', '15px')
								.css('height', '17px')
							}
					
							if (oOptions.view) 
							{
								$('.ns1blankspaceExpenseView').button( {
									text: false,
									icons: {
										primary: "ui-icon-play"
									}
								})
								.click(function() {
									ns1blankspace.financial.payment.expense.edit({xhtmlElementID: this.id})
								})
								.css('width', '15px')
								.css('height', '17px')
							}	
						}
					}	
				}
}				
