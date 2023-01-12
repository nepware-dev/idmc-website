<?php

namespace Drupal\idmcshorthandredirect\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Drupal\Core\Url;

/**
 * Class MyModuleSubscriber.
 *
 * @package Drupal\mymodule\EventSubscriber
 */
class IdmcShorthandRedirectSubscriber implements EventSubscriberInterface {

  /**
   * Registers the methods in this class that should be listeners.
   *
   * @return array
   *   An array of event listener definitions.
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = ['onRequest'];
    return $events;
  }

  /**
   * Manipulates the request object.
   *
   * @param \Symfony\Component\HttpKernel\Event\GetResponseEvent $event
   *   The Event to process.
   */
  public function onRequest(GetResponseEvent $event) {
    $response = $event->getRequest();
	$node = \Drupal::routeMatch()->getParameter('node');
	 
	if (isset($node) && !\Drupal::service('router.admin_context')->isAdminRoute()) {
		  $nodeType = $node->getType();
		
		
		if ($nodeType == "shorthand") {
//			echo "<pre>";
//			print_r($node);
//			echo "</pre>";
			$this->eventRedirectToPath($event, $node->field_iframe_url[0]->value);
			print_r($node->field_iframe_url[0]->value);
		}
	  }

  }

  /**
   * Sets a redirect response on a GetResponseEvent.
   *
   * Redirection may not work if the originally-requested
   * path does not exist (404). In this case you may be redirected
   * to the front page.
   *
   * @param GetResponseEvent $event
   *   Event to update.
   * @param string $path
   *   Drupal path.
   */
  private function eventRedirectToPath(GetResponseEvent &$event, $path) {
    //$redirect_target_url = Url::fromUserInput($path);
    $response = new TrustedRedirectResponse($path);
    $event->setResponse($response);
  }

 

}