/**
 * --------------------------------------------------------------------
 * jQuizzy - jQuery plugin for creating quizzes
 * by Siddharth S - www.ssiddharth.com
 * Copyright (c) 2011 Siddharth
 * Version: 1.0	
 * --------------------------------------------------------------------
 **/ (function ($)
{

    $.fn.jquizzy = function (settings)
    {

        var defaults = {
            questions: null,
            twitterStatus: 'I scored {score}% on this awesome! Check it out!',
            startText: 'Let\'s get started!',
            endText: 'Finished!',
            splashImage: '../assets/images/quiz/start-quiz.png',
            twitterImage: '../images/quiz/share.png',

            twitterUsername: 'jQuizzy',
            resultComments: {
                perfect: 'Perfect!',
                excellent: 'Excellent!',
                good: 'Good!',
                average: 'Acceptable!',
                bad: 'Disappointing!',
                poor: 'Poor!',
                worst: 'Nada!'
            }

        };

        var config = $.extend(defaults, settings);
        if (config.questions === null)
        {
            $(this).html('<div class="intro-container slide-container"><h2 class="qTitle">Failed to parse questions.</h2></div>');
            return;
        }

        var superContainer = $(this),
            answers = [],
   			 introFob = '	<div class="intro-container slide-container"><div class="question-number">'+config.startText+'</div><a class="nav-start" href="#" data-role="button" data-inline="true" data-icon="star" data-theme="b">Start Quiz</a></div>',
            exitFob = '<div class="results-container slide-container"><div class="question-number">' + config.endText + '</div><div class="progress-keeper"><div class="progress"></div></div><div class="result-keeper"></div></div>',
            contentFob = '';
        superContainer.addClass('main-quiz-holder');

        for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++)
        {
            contentFob += '<div class="slide-container"><div class="question-number">Question ' + (questionsIteratorIndex + 1) + ' of ' + config.questions.length + '</div>';
			contentFob += '<div class="progress-keeper"><div class="progress"></div></div>';			
			contentFob += '<div class="question">' + config.questions[questionsIteratorIndex].question + '<span class="notice"><br />* Please select an option.</span></div><ul class="answers">';
            for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[questionsIteratorIndex].answers.length; answersIteratorIndex++)
            {
                contentFob += '<li>' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
            }

            contentFob += '</ul><div class="nav-container">';

            if (questionsIteratorIndex !== 0)
            {
                contentFob += '<div class="prev"><a class="nav-previous" href="#" data-role="button" data-inline="true" data-icon="arrow-l" data-theme="b">Previous</a></div>';
            }

            if (questionsIteratorIndex < config.questions.length - 1)
            {
                contentFob += '<div class="next"><a class="nav-next" href="#" data-role="button" data-inline="true" data-icon="arrow-r" data-iconpos="right" data-theme="b">Next</a></div>';
            }
            else
            {
                contentFob += '<div class="next final"><a class="nav-show-result" href="#" data-role="button" data-inline="true" data-icon="arrow-r" data-iconpos="right" data-theme="b">Results</a></div>';
            }

            contentFob += '</div></div>';
            answers.push(config.questions[questionsIteratorIndex].correctAnswer);
        }

        //superContainer.html(introFob + contentFob + exitFob);
		superContainer.html(contentFob + exitFob);
		
        var progress = superContainer.find('.progress'),
            progressKeeper = superContainer.find('.progress-keeper'),
            notice = superContainer.find('.notice'),
            progressWidth = progressKeeper.width(),
            userAnswers = [],
            questionLength = config.questions.length,
            slidesList = superContainer.find('.slide-container');
			navNext = superContainer.find('.nav-next'); 
			
			
			// Hide the menu bar until quiz complete
			$('.content-secondary').css('visibility','hidden');
			// Hide the global nav until quiz complete
			/*$('.ui-footer-fixed').css('visibility','hidden');
			$('.ui-footer-fixed').css('display','none'); */ // doesn't work
			//console.log('progressWidth: ' + progressWidth);

        function checkAnswers()
        {
            var resultArr = [],
                flag = false;
            for (i = 0; i < answers.length; i++)
            {

                if (answers[i] == userAnswers[i])
                {
                    flag = true;
                }
                else
                {
                    flag = false;
                }
                resultArr.push(flag);
            }
            return resultArr;
        }

        function roundReloaded(num, dec)
        {
            var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        }

        function judgeSkills(score)
        {
            var returnString;
            if (score == 100) return config.resultComments.perfect;
            else if (score > 90) return config.resultComments.excellent;
            else if (score > 70) return config.resultComments.good;
            else if (score > 50) return config.resultComments.average;
            else if (score > 35) return config.resultComments.bad;
            else if (score > 20) return config.resultComments.poor;
            else return config.resultComments.worst;
        }

        //progressKeeper.hide();
        notice.hide();
		//navNext.hide();
        slidesList.hide().first().fadeIn(200);
		
		/* User selects an option */
        superContainer.find('li').click(function ()
        {
            var thisLi = $(this);

            if (thisLi.hasClass('selected'))
            {
				// toggle selection
                thisLi.removeClass('selected');
            }
            else
            {	
				/* Deselect any other list items */ 
                thisLi.parents('.answers').children('li').removeClass('selected');
                thisLi.addClass('selected');		    
            }
        });
		
		/* Show first question */
        superContainer.find('.nav-start').click(function ()
        {
            $(this).parents('.slide-container').fadeOut(200, function ()
            {
                $(this).next().fadeIn(200);
                progressKeeper.fadeIn(600);
            });
            return false;

        });
		
		/* Next button clicked */
        superContainer.find('.next').click(function ()
        {
			/* if no option selected*/
            if ($(this).parents('.slide-container').find('li.selected').length === 0)
            {
                notice.fadeIn(200);
                return false;
            }

            notice.hide();
            $(this).parents('.slide-container').fadeOut(200, function ()
            {
                $(this).next().fadeIn(200);
            });
			//alert("animating to: " + progress.width());
            progress.animate(
            {
				width: progress.width() + Math.round(progressWidth / questionLength) + '%'				
            }, 600);
			//console.log(progress.width() + Math.round(progressWidth / questionLength) + '%');			
            return false;
        });
		
		
		/* Previous button clicked */
        superContainer.find('.prev').click(function ()
        {
            notice.hide();
            $(this).parents('.slide-container').fadeOut(200, function ()
            {
                $(this).prev().fadeIn(200);
            });

            progress.animate(
            {
                width: progress.width() - Math.round(progressWidth / questionLength) + '%'
            }, 200);
            return false;
        });

		/* Final button clicked */
        superContainer.find('.final').click(function ()
        {
            if ($(this).parents('.slide-container').find('li.selected').length === 0)
            {
                notice.fadeIn(200);
                return false;
            }

            superContainer.find('li.selected').each(function (index)
            {
                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
            });

            progressKeeper.hide();
            var results = checkAnswers(),
                resultSet = '',
                trueCount = 0,
                shareButton = '',
                score;
            for (var i = 0, toLoopTill = results.length; i < toLoopTill; i++)
            {
                if (results[i] === true)
                {
                    trueCount++;
                    isCorrect = true;
                }
                resultSet += '<div class="result-row"> Question #' + (i + 1) + (results[i] === true ? "<div class='correct'><span>Correct</span></div>" : "<div class='wrong'><span>Incorrect</span></div>");
                resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
                resultSet += "<ul>";
                for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++)
                {
                    var classestoAdd = '';
                    if (config.questions[i].correctAnswer == answersIteratorIndex + 1)
                    {
                        classestoAdd += 'right';
                    }
                    if (userAnswers[i] == answersIteratorIndex + 1)
                    {
                        classestoAdd += ' selected';
                    }
                    resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
                }
                resultSet += '</ul></div></div>';

            }
            score = roundReloaded(trueCount / questionLength * 100, 2);
            //shareButton = '<a href="http://twitter.com/share?text=' + config.twitterStatus.replace("{score}", score) + '&via=' + config.twitterUsername + '" class="share-button">Share on Twitter</a>';


            resultSet = '<h3 class="featureBox">' + judgeSkills(score) + ' You scored ' + score + '%</h3><p>Touch the boxes to review answers.</p>' + shareButton + resultSet + '<div class="jquizzy-clear"></div>';
            resultSet += '<a href="../results.html" data-role="button" data-inline="true" data-icon="grid" data-theme="b">Results</a>';
			superContainer.find('.result-keeper').html(resultSet).show(200);
            superContainer.find('.resultsview-qhover').hide();
            superContainer.find('.result-row').hover(function ()
            {
                $(this).find('.resultsview-qhover').show();
            }, function ()
            {
                $(this).find('.resultsview-qhover').hide();
            });
            $(this).parents('.slide-container').fadeOut(200, function ()
            {
                $(this).next().fadeIn(200);
            });
			
			
			
			// Save score
			var topic = "Sociology";
			var	score = score;
			alert("saving to storage");
			$.jStorage.set(topic,score);
			
			// Restore menu panel
			$('.content-secondary').css('visibility','visible');
						
            return false;
        });
    };
})(jQuery);