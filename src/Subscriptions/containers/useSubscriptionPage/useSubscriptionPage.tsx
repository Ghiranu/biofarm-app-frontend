import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SubscriptionService from "../../services/subscription.service";

const useSubscriptionPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => SubscriptionService.getSubscriptions("get-subscriptions"),
  });

  const queryClient = useQueryClient();

  const cancelSubscriptionMutation = useMutation({
    mutationFn: (subscriptionId) =>
      SubscriptionService.cancelSubscription(
        `cancel-subscription/${subscriptionId}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["subscriptions"]);
    },
  });

  return { data, error, isLoading, cancelSubscriptionMutation };
};

export default useSubscriptionPage;
